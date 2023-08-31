import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityListResponse} from 'lib/sdk/models/Entity';
import {type Database} from 'lib/supabase/models';

export type UserProps = Database['public']['Tables']['users']['Row'];

export const getUsers = async ({
  pickProps = ['*'],
  search = ''
}: {
  pickProps?: (keyof UserProps | '*')[];
  search?: string;
}) => {
  const supabase = createClientComponentClient();
  const query = supabase
    .from('users')
    .select(
      `
    ${pickProps?.join(', ')}
  `
    )
    .order('user_name');

  if (search) {
    query.ilike('user_name', `%${search}%`);
  }

  const {data: users, error} = await query;

  return {users, error} as EntityListResponse<'users', UserProps>;
};
