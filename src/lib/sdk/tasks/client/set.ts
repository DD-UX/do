import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {EntityWithUserToUpdate} from 'lib/sdk/models/Entity';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {type Database} from 'lib/supabase/models';

export type TaskToCreate = EntityWithUserToUpdate<Database['public']['Tables']['tasks']['Insert']>;

export const setTask = async (creatingTask: TaskToCreate) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').insert(creatingTask).select();
  const {data: tasks, error} = (await query) as PostgrestSingleResponse<TaskProps[]>;
  const task = Array.isArray(tasks) && tasks.length > 0 ? tasks[0] : null;

  return {task, error};
};
