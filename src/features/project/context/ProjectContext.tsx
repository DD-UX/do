'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Text, useModal, useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';
import {useParams, useRouter} from 'next/navigation';

import DeleteModal from 'features/app/components/common/DeleteModal';
import useProjectById from 'features/app/hooks/useProjectById';
import {deleteProject} from 'lib/sdk/projects/client/delete';
import {ProjectProps, ProjectWithTasksProps} from 'lib/sdk/projects/client/get';
import {updateProject} from 'lib/sdk/projects/client/update';
import {TaskProps} from 'lib/sdk/tasks/client/get';

type ProjectContextProviderProps = {
  onInitialized?: () => void;
};

export type ProjectContextProps = {
  project: ProjectWithTasksProps<Pick<TaskProps, 'id' | 'title' | 'status' | 'assignee_id'>> | null;
  isLoadingProject: boolean;
  error: PostgrestError | null;
  refreshProject(): void;

  isUpdatingProject: boolean;
  updateProject(updatingProject: ProjectProps): void;

  isDeletingProject: boolean;
  deleteProject(): void;
};

export const ProjectContext = createContext<ProjectContextProps>({
  project: null,
  isLoadingProject: false,
  error: null,
  refreshProject: () => {},

  isUpdatingProject: false,
  updateProject: () => {},

  isDeletingProject: false,
  deleteProject: () => {}
});

export const ProjectContextProvider: FC<PropsWithChildren<ProjectContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {id: projectId} = useParams();
  const router = useRouter();

  const {setToast} = useToasts();
  const {project, error, refreshProject, isLoadingProject} = useProjectById<
    ProjectContextProps['project']
  >({
    projectId: String(projectId),
    withTasks: true
  });
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalInstance = useModal();

  // This method triggers the delete modal
  const handleDeleteProject = () => {
    // Open modal
    modalInstance.setVisible(true);
  };

  // This method deletes the selected project
  const deleteProjectHandler = async () => {
    if (!project) {
      return;
    }

    const {id, title} = project;

    try {
      setIsDeleting(true);
      await deleteProject(id);
      setToast({
        text: `${title} project deleted successfully`,
        type: 'success'
      });
      // Refresh list
      await router.push('/projects');
    } catch (error) {
      setToast({
        text: `An error occurred while deleting ${title} project.`,
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // This method deletes the selected project
  const updateProjectHandler = async (updatingProject: ProjectProps) => {
    try {
      setIsUpdating(true);
      await updateProject(updatingProject);
      setToast({
        text: `${updatingProject.title} project updated successfully`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: `An error occurred while updating ${updatingProject.title} project.`,
        type: 'error'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!isLoadingProject && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingProject]);

  return (
    <ProjectContext.Provider
      value={{
        isLoadingProject,
        project,
        error,
        refreshProject,

        updateProject: updateProjectHandler,
        isUpdatingProject: isUpdating,

        deleteProject: handleDeleteProject,
        isDeletingProject: isDeleting
      }}
    >
      {children}

      <DeleteModal
        modalInstance={modalInstance}
        title="Delete Project"
        description={
          <Text h6>
            Are you sure you want to delete <Text b>{project?.title}</Text>?
          </Text>
        }
        disabled={isDeleting}
        onDelete={deleteProjectHandler}
      />
    </ProjectContext.Provider>
  );
};
