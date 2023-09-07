'use client';
import {FC} from 'react';
import {Button} from '@geist-ui/core';
import Github from '@geist-ui/icons/github';

import {setSessionWithGithub} from 'lib/sdk/session/client/set';

const GithubSignInButton: FC = () => {
  return (
    <Button auto type="secondary" ghost icon={<Github />} onClick={setSessionWithGithub}>
      Sign in with Github
    </Button>
  );
};

export default GithubSignInButton;
