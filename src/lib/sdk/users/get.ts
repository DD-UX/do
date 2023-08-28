import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

import {EntityResponse} from 'lib/sdk/models/Entity';
import {type Database} from 'lib/supabase/models';

type UserProps = Database['public']['Tables']['users']['Row'];

export const getUsers = async (pickUserProps: string[] = ['*']) => {
  const supabase = createClientComponentClient();
  const {data: users, error} = await supabase.from('users').select(pickUserProps.join(', '));

  return {users, error} as EntityResponse<'users', UserProps>;
};
