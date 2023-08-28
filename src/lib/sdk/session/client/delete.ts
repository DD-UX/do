import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

export const deleteSession = async () => {
  const {auth} = createClientComponentClient();
  await auth.signOut();
};
