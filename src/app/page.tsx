import {FC} from 'react';
import NextLink from 'next/link';
import {redirect} from 'next/navigation';

import {getSession} from 'lib/sdk/session/get';

const Home: FC = async () => {
  const {session} = await getSession();

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
