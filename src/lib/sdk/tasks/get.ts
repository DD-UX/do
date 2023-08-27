import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export const getTasks = async () => {
  const {auth} = createServerComponentClient({cookies});
  const {data: tasks} = await auth.getSession();

  return tasks;
};
