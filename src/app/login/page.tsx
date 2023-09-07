import {FC} from 'react';

import GithubSignInButton from 'features/auth/components/GithubSignInButton';
import GoogleSignInButton from 'features/auth/components/GoogleSignInButton';

const LoginPage: FC = () => {
  return (
    <main className="grid gap-1 h-full place-items-center place-content-center">
      <GithubSignInButton />
      <GoogleSignInButton />
    </main>
  );
};

export default LoginPage;
