import {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Quicksand} from 'next/font/google';

import SignOutButton from 'features/auth/components/SignOutButton';
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
        <div className="h-full grid  grid-rows-[40px_1fr]">
          <header className="px-2 flex items-center justify-between">
            <h1>DO, the TODO app</h1>
            <SignOutButton />
          </header>
          <section className="p-2">{children}</section>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
