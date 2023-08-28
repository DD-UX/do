import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityResponse} from 'lib/sdk/models/Entity';
import {type Database} from 'lib/supabase/models';

export type TaskProps = Database['public']['Tables']['tasks']['Row'];

export const getTasks = async (pickProps: (keyof TaskProps | '*')[] = ['*']) => {
  const supabase = createClientComponentClient();
  const {data: tasks, error} = await supabase.from('tasks').select(`
    ${pickProps.join(', ')},
    users(*)
  `);

  return {tasks, error} as EntityResponse<'tasks', TaskProps>;
};
