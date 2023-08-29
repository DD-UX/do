'use client';

import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';

import useTasksData from 'features/app/hooks/useTasksData';

type TasksContextProviderProps = {
  onInitialized?: () => void;
};

export const TasksContext = createContext({
  tasks: [],
  isLoadingTasks: false,
  error: null,
  refreshTasks: () => {}
});

export const TasksContextProvider: FC<PropsWithChildren<TasksContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const {tasks, error, refreshTasks, isLoadingTasks} = useTasksData();
  const [hasInitialized, setHasInitialized] = useState(false);

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
        refreshTasks
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
