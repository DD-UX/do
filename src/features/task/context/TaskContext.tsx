'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Text, useModal, useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';
import {useParams, useRouter} from 'next/navigation';

import DeleteModal from 'features/app/components/common/DeleteModal';
import useProjectByTask from 'features/app/hooks/useProjectByTask';
import useTaskById from 'features/app/hooks/useTaskById';
import {ProjectWithTasksProps} from 'lib/sdk/projects/client/get';
import {deleteTask} from 'lib/sdk/tasks/client/delete';
import {TaskProps} from 'lib/sdk/tasks/client/get';

type TaskContextProviderProps = {
  onInitialized?: () => void;
};

type TaskContextProps = {
  task: TaskProps | null;
  isLoadingTask: boolean;
  error: PostgrestError | null;
  refreshTask(): void;

  isDeletingTask: boolean;
  deleteTask(): void;

  project: ProjectWithTasksProps | null;
  isLoadingProject: boolean;

  refreshProject(): void;
};

export const TaskContext = createContext<TaskContextProps>({
  task: null,
  isLoadingTask: false,
  error: null,
  refreshTask: () => {},

  isDeletingTask: false,
  deleteTask: () => {},

  project: null,
  isLoadingProject: false,
  refreshProject: () => {}
});

export const TaskContextProvider: FC<PropsWithChildren<TaskContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {id: taskId} = useParams();
  const router = useRouter();

  const {setToast} = useToasts();
  const {task, error, refreshTask, isLoadingTask} = useTaskById(String(taskId));
  const {project, isLoadingProject, refreshProject} = useProjectByTask(task);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalInstance = useModal();

  // This method triggers the delete modal
  const handleDeleteTask = () => {
    // Open modal
    modalInstance.setVisible(true);
  };

  // This method deletes the selected task
  const deleteTaskHandler = async () => {
    if (!task) {
      return;
    }

    const {id, title} = task;

    try {
      setIsDeleting(true);
      await deleteTask(id);
      setToast({
        text: `${title} task deleted successfully`,
        type: 'success'
      });
      // Refresh list
      await router.push('/dashboard');
    } catch (error) {
      setToast({
        text: `An error occurred while deleting ${title} task.`,
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!isLoadingTask && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingTask]);

  return (
    <TaskContext.Provider
      value={{
        isLoadingTask,
        task,
        error,
        refreshTask,

        deleteTask: handleDeleteTask,
        isDeletingTask: isDeleting,

        project,
        isLoadingProject,
        refreshProject
      }}
    >
      {children}

      <DeleteModal
        modalInstance={modalInstance}
        title="Delete Task"
        description={
          <Text h6>
            Are you sure you want to delete <Text b>{task?.title}</Text>?
          </Text>
        }
        disabled={isDeleting}
        onDelete={deleteTaskHandler}
      />
    </TaskContext.Provider>
  );
};
