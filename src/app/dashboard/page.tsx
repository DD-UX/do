'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutWrapper} from 'features/app/components/common/Layout';
import LayoutContent from 'features/app/components/common/LayoutContent';
import DashboardContent from 'features/dashboard/components/DashboardContent';
import DashboardHeader from 'features/dashboard/components/DashboardHeader';

const Dashboard: FC = () => {
  const theme = useTheme();

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <DashboardHeader />
        <AnimatePresence mode="wait">
          <LayoutContent noPadding>
            <DashboardContent />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default Dashboard;
