'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Text, useModal, useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import DeleteModal from 'features/app/components/common/DeleteModal';
import useProjectsData from 'features/app/hooks/useProjectsData';
import {deleteProject} from 'lib/sdk/projects/client/delete';
import {ProjectProps} from 'lib/sdk/projects/client/get';
import {updateProject} from 'lib/sdk/projects/client/update';

type ProjectsContextProviderProps = {
  onInitialized?: () => void;
};

type ProjectsContextProps = {
  projects: ProjectProps[] | null;
  isLoadingProjects: boolean;
  error: PostgrestError | null;
  refreshProjects(): void;

  isUpdatingProject: boolean;
  updateProject(updatedProject: ProjectProps): void;

  isDeletingProject: boolean;
  deleteProject(deletingProject: ProjectProps): void;
};

export const ProjectsContext = createContext<ProjectsContextProps>({
  projects: [],
  isLoadingProjects: false,
  error: null,
  refreshProjects: () => {},

  isUpdatingProject: false,
  updateProject: () => {},

  isDeletingProject: false,
  deleteProject: () => {}
});

export const ProjectsContextProvider: FC<PropsWithChildren<ProjectsContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {setToast} = useToasts();
  const {projects, error, refreshProjects, isLoadingProjects} = useProjectsData();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const modalInstance = useModal();

  // This method triggers the delete modal
  const handleDeleteProject = (deletingProject: ProjectProps) => {
    // Select deleting project
    setSelectedProject(deletingProject);

    // Open modal
    modalInstance.setVisible(true);
  };

  // This method deletes the selected project
  const deleteProjectHandler = async () => {
    if (!selectedProject) {
      return;
    }

    const {id, title} = selectedProject;

    try {
      setIsDeleting(true);
      await deleteProject(id);
      setToast({
        text: `${title} project deleted successfully`,
        type: 'success'
      });
      // Refresh list
      await refreshProjects();

      // Close modal
      modalInstance.setVisible(false);

      // Clean up selected project
      setSelectedProject(null);
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
    if (!updatingProject.assignee_id) {
      updatingProject.assignee_id = null;
    }
    try {
      setIsUpdating(true);
      await updateProject(updatingProject);
      // Refresh list
      await refreshProjects();
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
    if (!isLoadingProjects && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingProjects]);

  return (
    <ProjectsContext.Provider
      value={{
        isLoadingProjects,
        projects,
        error,
        refreshProjects,

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
            Are you sure you want to delete <Text b>{selectedProject?.title}</Text>?
          </Text>
        }
        disabled={isDeleting}
        onDelete={deleteProjectHandler}
      />
    </ProjectsContext.Provider>
  );
};
