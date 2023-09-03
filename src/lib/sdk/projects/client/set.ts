import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {EntityWithUserToUpdate} from 'lib/sdk/models/Entity';
import {ProjectProps} from 'lib/sdk/projects/client/get';
import {type Database} from 'lib/supabase/models';

export type ProjectToCreate = EntityWithUserToUpdate<
  Database['public']['Tables']['projects']['Insert']
>;

export const setProject = async (creatingProject: ProjectToCreate) => {
  const supabase = createClientComponentClient();
  const query = supabase.from('projects').insert(creatingProject).select();
  const {data: projects, error} = (await query) as PostgrestSingleResponse<ProjectProps[]>;
  const project = Array.isArray(projects) && projects.length > 0 ? projects[0] : null;

  return {project, error};
};
