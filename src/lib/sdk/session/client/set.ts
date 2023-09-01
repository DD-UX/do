import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

export const setSessionWithGithub = async () => {
  const {auth} = createClientComponentClient();
  await auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback/github`
    }
  });
};
