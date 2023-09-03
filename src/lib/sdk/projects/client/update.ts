import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {ProjectProps} from 'lib/sdk/projects/client/get';

export const updateProject = async (updatingProject: ProjectProps) => {
  const supabase = createClientComponentClient();
  const query = supabase
    .from('projects')
    .update(updatingProject)
    .eq('id', updatingProject.id)
    .select();

  const {data: project, error} = (await query) as PostgrestSingleResponse<ProjectProps[]>;

  return {project, error};
};
