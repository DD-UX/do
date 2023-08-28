'use client';

import {FC, PropsWithChildren} from 'react';
import {GeistProvider} from '@geist-ui/core';

import GlobalStyles from 'features/app/styles/global.styles';
import GeistStyles from 'lib/geist/geist.styles';

const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <GeistProvider themeType="dark">
      {/* Styles */}
      <GlobalStyles />
      <GeistStyles />

      {children}
    </GeistProvider>
  );
};

export default Providers;
