'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {LayoutContent, LayoutWrapper} from 'features/app/components/common/Layout';
import TasksContent from 'features/task/components/TasksContent';
import TasksHeader from 'features/task/components/TasksHeader';

const TasksPage: FC = () => {
  const theme = useTheme();

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <AppNavigation />
        <TasksHeader />
        <AnimatePresence mode="wait">
          <LayoutContent $theme={theme} $fullWidth>
            <TasksContent />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default TasksPage;
