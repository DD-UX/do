import {FC} from 'react';
import NextLink from 'next/link';

import {authGuard} from 'features/auth/helpers/guard-helpers';

const Home: FC = async () => {
  await authGuard();

  return (
    <main className="flex flex-col gap-1">
      <NextLink href="/projects" passHref>
        Dashboard
      </NextLink>
    </main>
  );
};

export default Home;
