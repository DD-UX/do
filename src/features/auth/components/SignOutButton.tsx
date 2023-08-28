'use client';

import {FC} from 'react';
import {Button} from '@geist-ui/core';
import {useRouter} from 'next/navigation';

import {deleteSession} from 'lib/sdk/session/delete';

const GithubSignInButton: FC = () => {
  const router = useRouter();

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <Button auto type="secondary" scale={0.75} onClick={handleLogout}>
      Sign out
    </Button>
  );
};

export default GithubSignInButton;
