'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Text, useModal, useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import DeleteModal from 'features/app/components/common/DeleteModal';
import useTasksData from 'features/app/hooks/useTasksData';
import {deleteTask} from 'lib/sdk/tasks/client/delete';
import {TaskProps} from 'lib/sdk/tasks/client/get';

type TasksContextProviderProps = {
  onInitialized?: () => void;
};

type TasksContextProps = {
  tasks: TaskProps[] | null;
  isLoadingTasks: boolean;
  error: PostgrestError | null;
  refreshTasks(): void;

  isDeletingTask: boolean;
  deleteTask(deletingTask: TaskProps): void;
};

export const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  isLoadingTasks: false,
  error: null,
  refreshTasks: () => {},

  isDeletingTask: false,
  deleteTask: () => {}
});

export const TasksContextProvider: FC<PropsWithChildren<TasksContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {setToast} = useToasts();
  const {tasks, error, refreshTasks, isLoadingTasks} = useTasksData({});
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const modalInstance = useModal();

  // This method triggers the delete modal
  const handleDeleteTask = (deletingTask: TaskProps) => {
    // Select deleting task
    setSelectedTask(deletingTask);

    // Open modal
    modalInstance.setVisible(true);
  };

  // This method deletes the selected task
  const deleteTaskHandler = async () => {
    if (!selectedTask) {
      return;
    }

    const {id, title} = selectedTask;

    try {
      setIsDeleting(true);
      await deleteTask(id);
      setToast({
        text: `${title} task deleted successfully`,
        type: 'success'
      });
      // Refresh list
      await refreshTasks();

      // Close modal
      modalInstance.setVisible(false);

      // Clean up selected task
      setSelectedTask(null);
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
    if (!isLoadingTasks && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingTasks]);

  return (
    <TasksContext.Provider
      value={{
        isLoadingTasks,
        tasks,
        error,
        refreshTasks,

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
            Are you sure you want to delete <Text b>{selectedTask?.title}</Text>?
          </Text>
        }
        disabled={isDeleting}
        onDelete={deleteTaskHandler}
      />
    </TasksContext.Provider>
  );
};
