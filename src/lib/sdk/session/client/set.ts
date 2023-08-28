import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

export const setSessionWithGithub = async () => {
  const {auth} = createClientComponentClient();
  await auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback/github'
    }
  });
};
