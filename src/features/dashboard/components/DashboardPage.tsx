'use client';

import {FC} from 'react';
import {useMediaQuery, useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutContent, LayoutWrapper} from 'features/app/components/common/Layout';
import DashboardContent from 'features/dashboard/components/DashboardContent';
import DashboardHeader from 'features/dashboard/components/DashboardHeader';

const DashboardPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('mobile');
  return (
    <LayoutWrapper $theme={theme}>
      <DashboardHeader />
      <AnimatePresence mode="wait">
        <LayoutContent $theme={theme} $fullWidth={isMobile}>
          <DashboardContent />
        </LayoutContent>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default DashboardPage;
