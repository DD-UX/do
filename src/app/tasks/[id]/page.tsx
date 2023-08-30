'use client';

import {FC} from 'react';
import {useMediaQuery, useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutContent, LayoutWrapper} from 'features/app/components/Layout';
import TaskForm from 'features/task/components/TaskForm';
import TaskHeader from 'features/task/components/TaskHeader';
import {TaskContextProvider} from 'features/task/context/TaskContext';

const Tasks: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('mobile');

  return (
    <TaskContextProvider>
      <AnimatePresence mode="wait">
        <LayoutWrapper $theme={theme}>
          <TaskHeader />
          <AnimatePresence mode="wait">
            <LayoutContent $theme={theme} $fullWidth={isMobile} $noPadding>
              <TaskForm />
            </LayoutContent>
          </AnimatePresence>
        </LayoutWrapper>
      </AnimatePresence>
    </TaskContextProvider>
  );
};

export default Tasks;
