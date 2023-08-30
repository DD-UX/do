import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getTask, TaskProps} from 'lib/sdk/tasks/client/get';

type useTaskByIdValues = {
  task: TaskProps | null;
  isLoadingTask: boolean;
  refreshTask(): void;
};

/*
 * This Hook will pull down all the task
 */
function useTaskById(taskId: TaskProps['id']): useTaskByIdValues {
  const {setToast} = useToasts();
  const [tasksData, setTaskData] = useState<TaskProps>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  const loadTask = async () => {
    try {
      setIsLoadingTask(true);
      const {task, error} = await getTask(taskId);
      setError(error);
      setTaskData(task);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading task.',
        type: 'error'
      });
    } finally {
      setIsLoadingTask(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const memoizedReturnValue: useTaskByIdValues = useMemo(() => {
    return {
      task: tasksData,
      error,

      isLoadingTask,
      refreshTask: loadTask
    };
  }, [tasksData, isLoadingTask]);

  return memoizedReturnValue;
}

export default useTaskById;
