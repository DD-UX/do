'use client';

import {FC} from 'react';
import {Button} from '@geist-ui/core';
import LogOut from '@geist-ui/icons/logOut';
import {useRouter} from 'next/navigation';

import {deleteSession} from 'lib/sdk/session/client/delete';

type SignOutButtonProps = {
  compact?: boolean;
};

const SignOutButton: FC<SignOutButtonProps> = ({compact = false}) => {
  const router = useRouter();

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <Button auto type="secondary" icon={<LogOut />} scale={0.75} onClick={handleLogout}>
      {!compact && 'Log out'}
    </Button>
  );
};

export default SignOutButton;
