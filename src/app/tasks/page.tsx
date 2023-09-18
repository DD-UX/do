'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutContent, LayoutWrapper} from 'features/app/components/common/Layout';
import DashboardContent from 'features/dashboard/components/DashboardContent';
import TasksHeader from 'features/task/components/TasksHeader';

const TasksPage: FC = () => {
  const theme = useTheme();

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <TasksHeader />
        <AnimatePresence mode="wait">
          <LayoutContent $theme={theme} $fullWidth>
            <DashboardContent />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default TasksPage;
