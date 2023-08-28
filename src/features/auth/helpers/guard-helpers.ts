import {redirect} from 'next/navigation';

import {getSessionServer} from 'lib/sdk/session/server/get';

export const authGuard = async () => {
  const {session} = await getSessionServer();

  if (!session) {
    redirect('login');
  }
};
