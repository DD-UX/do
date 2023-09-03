import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {type Database} from 'lib/supabase/models';

export type ProjectProps = Database['public']['Tables']['projects']['Row'];

export const getProjects = async ({
  pickProps = ['*'],
  search = ''
}: {
  pickProps?: (keyof ProjectProps | '*' | string)[];
  search?: string;
}) => {
  const supabase = createClientComponentClient();
  const query = supabase
    .from('projects')
    .select(pickProps?.join(','))
    .order('created_at', {ascending: false});

  if (search) {
    query.ilike('title', `%${search}%`);
  }

  const {data: projects, error} = (await query) as PostgrestSingleResponse<ProjectProps[]>;

  return {projects, error};
};

export const getProject = async <T = ProjectProps>({
  pickProps = ['*'],
  id
}: {
  pickProps?: (keyof ProjectProps | '*' | string)[];
  id: ProjectProps['id'];
}) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('projects').select(pickProps.join(',')).eq('id', id);

  const {data: projects, error} = (await query) as PostgrestSingleResponse<T[]>;
  const project = Array.isArray(projects) && projects.length > 0 ? projects[0] : null;

  return {
    project,
    error
  };
};
