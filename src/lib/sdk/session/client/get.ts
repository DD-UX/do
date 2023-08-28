import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

export const getSession = async () => {
  const {auth} = createClientComponentClient();
  const {data: session} = await auth.getSession();

  return session;
};
