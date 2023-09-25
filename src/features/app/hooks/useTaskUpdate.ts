import {useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';

import {NO_VALUE} from 'features/app/constants/ui-constants';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {updateTask} from 'lib/sdk/tasks/client/update';

type UseTaskUpdateValues = {
  isUpdatingTask: boolean;
  updateTask(updatingTask: TaskProps): void;
};

/*
 * This Hook will provide a toolkit to update and monitor task updates
 */
function useTaskUpdate(): UseTaskUpdateValues {
  const {setToast} = useToasts();
  const [isUpdating, setIsUpdating] = useState(false);

  // This method updates the selected task
  const updateTaskHandler = async (updatingTask: TaskProps & Record<string, any>) => {
    // Normalize assignee_id
    if (!updatingTask.assignee_id) {
      updatingTask.assignee_id = null;
    }

    // Normalize project_id
    if (updatingTask.project_id === NO_VALUE) {
      updatingTask.project_id = null;
    }

    // Clean any join coming from supabase before updating
    const {users, projects, ...updatingTaskWithoutJoins} = updatingTask;

    try {
      setIsUpdating(true);
      await updateTask(updatingTaskWithoutJoins);
      setToast({
        text: `${updatingTaskWithoutJoins.title} task updated successfully`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: `An error occurred while updating ${updatingTaskWithoutJoins.title} task.`,
        type: 'error'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const memoizedReturnValue: UseTaskUpdateValues = useMemo(() => {
    return {
      updateTask: updateTaskHandler,
      isUpdatingTask: isUpdating
    };
  }, [isUpdating]);

  return memoizedReturnValue;
}

export default useTaskUpdate;
