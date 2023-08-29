import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getTasks, TaskProps} from 'lib/sdk/tasks/client/get';

type useTasksDataValues = {
  tasks: TaskProps[];
  isLoadingTasks: boolean;
  setSearch(taskName: string): void;
  refreshTasks(): void;
};

/*
 * This Hook will pull down all the tasks
 */
function useTasksData(): useTasksDataValues {
  const {setToast} = useToasts();
  const [tasksData, setTasksData] = useState<TaskProps[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [search, setSearch] = useState('');
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const loadTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const {tasks: tasksList, error} = await getTasks({search});
      setError(error);
      setTasksData(tasksList);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading tasks.',
        type: 'error'
      });
    } finally {
      setIsLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const memoizedReturnValue: useTasksDataValues = useMemo(() => {
    return {
      tasks: tasksData,
      error,

      isLoadingTasks,
      refreshTasks: loadTasks,
      setSearch
    };
  }, [tasksData, isLoadingTasks]);

  return memoizedReturnValue;
}

export default useTasksData;