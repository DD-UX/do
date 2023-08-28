import {FC} from 'react';
import NextLink from 'next/link';
import {redirect} from 'next/navigation';

import {getSessionServer} from 'lib/sdk/session/server/get';

const Home: FC = async () => {
  const {session} = await getSessionServer();

  if (!session) {
    redirect('login');
  }

  return (
    <main className="flex flex-col gap-1">
      <NextLink href="/dashboard" passHref>
        <a>Dashboard</a>
      </NextLink>
    </main>
  );
};

export default Home;
