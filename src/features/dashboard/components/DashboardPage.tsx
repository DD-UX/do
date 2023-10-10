'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutWrapper} from 'features/app/components/common/Layout';
import LayoutContent from 'features/app/components/common/LayoutContent';
import DashboardContent from 'features/dashboard/components/DashboardContent';
import DashboardHeader from 'features/dashboard/components/DashboardHeader';

const DashboardPage: FC = () => {
  const theme = useTheme();
  return (
    <LayoutWrapper $theme={theme}>
      <DashboardHeader />
      <AnimatePresence mode="wait">
        <LayoutContent fullWidth noPadding>
          <DashboardContent />
        </LayoutContent>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default DashboardPage;
