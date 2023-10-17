'use client';
import {FC} from 'react';
import {RiGoogleFill} from 'react-icons/ri';
import {Button} from 'flowbite-react';

import {setSessionWithGoogle} from 'lib/sdk/session/client/set';

const GoogleSignInButton: FC = () => {
  return (
    <Button color="red" fullSized onClick={setSessionWithGoogle}>
      <span className="inline-flex gap-2">
        <RiGoogleFill color="red" size={20} />
        Sign in with Google
      </span>
    </Button>
  );
};

export default GoogleSignInButton;
