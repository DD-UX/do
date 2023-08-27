import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export const getSession = async () => {
  const {auth} = createServerComponentClient({cookies});
  const {data: session} = await auth.getSession();

  return session;
};
