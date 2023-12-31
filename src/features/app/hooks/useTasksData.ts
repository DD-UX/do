import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getTasks, TaskProps} from 'lib/sdk/tasks/client/get';

type UseTasksDataValues = {
  tasks: TaskProps[] | null;
  error: PostgrestError | null;
  isLoadingTasks: boolean;
  setSearch(taskName: string): void;
  refreshTasks(): void;
};

type UseTasksDataProps = {
  projectId?: string | null;
  pickProps?: (keyof TaskProps | '*')[];
};

/*
 * This Hook will pull down all the tasks
 */
function useTasksData({projectId, pickProps}: UseTasksDataProps): UseTasksDataValues {
  const {setToast} = useToasts();
  const [tasksData, setTasksData] = useState<TaskProps[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [search, setSearch] = useState('');
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const loadTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const {tasks: tasksList, error} = await getTasks({
        search,
        projectId: projectId || '',
        ...(pickProps && {pickProps})
      });
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
  }, [projectId, search]);

  const memoizedReturnValue: UseTasksDataValues = useMemo(() => {
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
