import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityResponse} from 'lib/sdk/models/Entity';
import {TaskProps} from 'lib/sdk/tasks/client/get';

export const deleteTask = async (taskId: string) => {
  const supabase = createClientComponentClient();
  const {data: task, error} = await supabase.from('tasks').delete().eq('id', taskId).select();

  return {task, error} as EntityResponse<'tasks', TaskProps>;
};
