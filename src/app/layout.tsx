import {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Quicksand} from 'next/font/google';

import './globals.css';

const quicksand = Quicksand({subsets: ['latin']});
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Do',
  description: 'Do tasks and Do resolve them'
};

const RootLayout = ({children}: {children: ReactNode}) => (
  <html lang="en" className="h-full">
    <body className={`${quicksand.className} h-full`}>{children}</body>
  </html>
);

export default RootLayout;
