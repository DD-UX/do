import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {ProjectProps} from 'lib/sdk/projects/client/get';

export const deleteProject = async (projectId: string) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('projects').delete().eq('id', projectId).select();
  const {data: projects, error} = (await query) as PostgrestSingleResponse<ProjectProps[]>;

  const project = Array.isArray(projects) && projects.length > 0 ? projects[0] : null;

  return {project, error};
};
