'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Text, useModal, useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';
import {useParams, useRouter} from 'next/navigation';

import DeleteModal from 'features/app/components/common/DeleteModal';
import useTaskById from 'features/app/hooks/useTaskById';
import {deleteTask} from 'lib/sdk/tasks/client/delete';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {updateTask} from 'lib/sdk/tasks/client/update';

type TaskContextProviderProps = {
  onInitialized?: () => void;
};

type TaskContextProps = {
  task: TaskProps | null;
  isLoadingTask: boolean;
  error: PostgrestError | null;
  refreshTask(): void;

  isUpdatingTask: boolean;
  updateTask(updatingTask: TaskProps): void;

  isDeletingTask: boolean;
  deleteTask(): void;
};

export const TaskContext = createContext<TaskContextProps>({
  task: null,
  isLoadingTask: false,
  error: null,
  refreshTask: () => {},

  isUpdatingTask: false,
  updateTask: () => {},

  isDeletingTask: false,
  deleteTask: () => {}
});

export const TaskContextProvider: FC<PropsWithChildren<TaskContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {id: taskId} = useParams();
  const router = useRouter();

  const {setToast} = useToasts();
  const {task, error, refreshTask, isLoadingTask} = useTaskById(String(taskId));
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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

  // This method deletes the selected task
  const updateTaskHandler = async (updatingTask: TaskProps) => {
    if (!updatingTask.assignee_id) {
      updatingTask.assignee_id = null;
    }
    try {
      setIsUpdating(true);
      await updateTask(updatingTask);
      setToast({
        text: `${updatingTask.title} task updated successfully`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: `An error occurred while updating ${updatingTask.title} task.`,
        type: 'error'
      });
    } finally {
      setIsUpdating(false);
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

        updateTask: updateTaskHandler,
        isUpdatingTask: isUpdating,

        deleteTask: handleDeleteTask,
        isDeletingTask: isDeleting
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
