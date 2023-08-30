import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityResponse} from 'lib/sdk/models/Entity';
import {TaskProps} from 'lib/sdk/tasks/client/get';

export const updateTask = async (updatingTask: TaskProps) => {
  const supabase = createClientComponentClient();
  const {data: task, error} = await supabase
    .from('tasks')
    .update(updatingTask)
    .eq('id', updatingTask.id)
    .select();

  return {task, error} as EntityResponse<'tasks', TaskProps>;
};
