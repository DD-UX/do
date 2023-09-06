import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {TaskProps} from 'lib/sdk/tasks/client/get';

export const updateTask = async (updatingTask: Partial<TaskProps>) => {
  const supabase = createClientComponentClient();
  const query = supabase
    .from('tasks')
    .update(updatingTask)
    .eq('id', updatingTask?.id)
    .select();

  const {data: task, error} = (await query) as PostgrestSingleResponse<TaskProps[]>;

  return {task, error};
};
