import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export const dynamic = 'force-dynamic';

export const getSessionServer = async () => {
  const {auth} = createServerComponentClient({cookies});
  const {data: session} = await auth.getSession();

  return session;
};
