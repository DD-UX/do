import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityResponse, EntityWithUserToUpdate} from 'lib/sdk/models/Entity';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {type Database} from 'lib/supabase/models';

export type TaskToCreate = EntityWithUserToUpdate<Database['public']['Tables']['tasks']['Insert']>;

export const setTask = async (creatingTask: TaskToCreate) => {
  const supabase = createClientComponentClient();
  const {data: task, error} = await supabase.from('tasks').insert(creatingTask).select();

  return {task: task?.[0] || null, error} as EntityResponse<'tasks', TaskProps>;
};
