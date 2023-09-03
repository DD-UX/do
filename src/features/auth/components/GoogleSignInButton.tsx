'use client';
import {FC} from 'react';
import {Button} from '@geist-ui/core';
import Chrome from '@geist-ui/icons/chrome';

import {setSessionWithGoogle} from 'lib/sdk/session/client/set';

const GoogleSignInButton: FC = () => {
  return (
    <Button auto type="error" ghost icon={<Chrome />} onClick={setSessionWithGoogle}>
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
