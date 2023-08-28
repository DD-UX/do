import {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Quicksand} from 'next/font/google';

import Providers from 'features/app/context/providers';
import {authGuard} from 'features/auth/helpers/guard-helpers';

import '../globals.css';

const quicksand = Quicksand({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard'
};

const RootLayout = async ({children}: {children: ReactNode}) => {
  // Guard against unauthorized access
  await authGuard();

  return (
    <html lang="en" className="h-full">
      <body className={`${quicksand.className} h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
