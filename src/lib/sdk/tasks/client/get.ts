import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityListResponse} from 'lib/sdk/models/Entity';
import {type Database} from 'lib/supabase/models';

export type TaskProps = Database['public']['Tables']['tasks']['Row'];

export const getTasks = async ({
  pickProps = ['*'],
  search = ''
}: {
  pickProps?: (keyof TaskProps | '*')[];
  search?: string;
}) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').select(`
    ${pickProps?.join(', ')},
    users(*)
  `);

  if (search) {
    query.ilike('title', `%${search}%`);
  }

  const {data: tasks, error} = await query;

  return {tasks, error} as EntityListResponse<'tasks', TaskProps>;
};