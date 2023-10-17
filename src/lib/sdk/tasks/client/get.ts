import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {type Database} from 'lib/supabase/models';

export type TaskProps = Database['public']['Tables']['tasks']['Row'];

export const getTasks = async ({
  pickProps = ['*'],
  search = '',
  sortBy = 'created_at',
  projectId
}: {
  pickProps?: (keyof TaskProps | '*')[];
  search?: string;
  sortBy?: keyof TaskProps;
  projectId?: string;
}) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').select(
    `
    ${pickProps?.join(', ')}
  `
  );

  if (search) {
    query.ilike('title', `%${search}%`);
  }

  if (projectId) {
    query.eq('project_id', projectId);
  }

  if (sortBy) {
    query.order(sortBy, {ascending: false});
  }

  const {data: tasks, error} = (await query) as PostgrestSingleResponse<TaskProps[]>;

  return {tasks, error};
};

export const getTask = async (id: TaskProps['id']) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('tasks').select('*').eq('id', id);

  const {data: tasks, error} = (await query) as PostgrestSingleResponse<TaskProps[]>;
  const task = Array.isArray(tasks) && tasks.length > 0 ? tasks[0] : null;

  return {
    task,
    error
  };
};
