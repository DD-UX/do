import {redirect} from 'next/navigation';

import {getSession} from 'lib/sdk/session/get';

export const authGuard = async () => {
  const {session} = await getSession();

  if (!session) {
    redirect('login');
  }
};
