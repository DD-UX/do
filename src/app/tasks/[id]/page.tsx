'use client';

import {FC, useContext} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {LayoutWrapper} from 'features/app/components/common/Layout';
import LayoutContent from 'features/app/components/common/LayoutContent';
import TaskForm from 'features/task/components/TaskForm';
import TaskHeader from 'features/task/components/TaskHeader';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskDetailPage: FC = () => {
  const theme = useTheme();
  const {task} = useContext(TaskContext);

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <AppNavigation />
        <TaskHeader />
        <AnimatePresence mode="wait">
          <LayoutContent fullWidth={!task?.project_id} noPadding>
            <TaskForm />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default TaskDetailPage;
