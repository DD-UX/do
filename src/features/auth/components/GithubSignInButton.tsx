'use client';

import {FC} from 'react';
import {RiGithubFill} from 'react-icons/ri';
import {Button} from 'flowbite-react';

import {setSessionWithGithub} from 'lib/sdk/session/client/set';

const GithubSignInButton: FC = () => {
  return (
    <Button color="light" fullSized onClick={setSessionWithGithub}>
      <span className="inline-flex gap-2">
        <RiGithubFill size={20} />
        Sign in with Github
      </span>
    </Button>
  );
};

export default GithubSignInButton;
