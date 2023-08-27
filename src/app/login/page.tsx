import {FC} from 'react';

import GithubSignInButton from 'features/auth/components/GithubSignInButton';

const LoginPage: FC = () => {
  return (
    <main className="flex flex-col gap-1">
      <div className="max-w-[300px]">
        <GithubSignInButton />
      </div>
    </main>
  );
};

export default LoginPage;
