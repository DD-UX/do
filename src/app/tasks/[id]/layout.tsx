import {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Quicksand} from 'next/font/google';

import Providers from 'features/app/context/providers';
import {authGuard} from 'features/auth/helpers/guard-helpers';
import {TaskContextProvider} from 'features/task/context/TaskContext';

import '../../globals.css';

const quicksand = Quicksand({subsets: ['latin']});
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tasks - Do',
  description: 'Do tasks and Do resolve them'
};

const RootLayout = async ({children}: {children: ReactNode}) => {
  // Guard against unauthorized access
  await authGuard();

  return (
    <html lang="en" className="h-full">
      <body className={`${quicksand.className} h-full dark`}>
        <Providers>
          <TaskContextProvider>{children}</TaskContextProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
