import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {TaskProps} from 'lib/sdk/tasks/client/get';

export const deleteTask = async (taskId: string) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').delete().eq('id', taskId).select();
  const {data: tasks, error} = (await query) as PostgrestSingleResponse<TaskProps[]>;

  const task = Array.isArray(tasks) && tasks.length > 0 ? tasks[0] : null;

  return {task, error};
};
