import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityListResponse, EntityResponse} from 'lib/sdk/models/Entity';
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
  const query = supabase
    .from('tasks')
    .select(
      `
    ${pickProps?.join(', ')}
  `
    )
    .order('created_at', {ascending: false});

  if (search) {
    query.ilike('title', `%${search}%`);
  }

  const {data: tasks, error} = await query;

  return {tasks, error} as EntityListResponse<'tasks', TaskProps>;
};

export const getTask = async (id: TaskProps['id']) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').select('*').eq('id', id);

  const {data: tasks, error} = await query;

  return {task: tasks?.[0] || null, error} as EntityResponse<'tasks', TaskProps>;
};
