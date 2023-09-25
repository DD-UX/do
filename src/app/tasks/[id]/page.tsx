'use client';

import {FC, useContext} from 'react';
import {useMediaQuery, useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutContent, LayoutWrapper} from 'features/app/components/common/Layout';
import TaskForm from 'features/task/components/TaskForm';
import TaskHeader from 'features/task/components/TaskHeader';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskDetailPage: FC = () => {
  const theme = useTheme();
  const {task} = useContext(TaskContext);
  const isMobile = useMediaQuery('mobile');

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <TaskHeader />
        <AnimatePresence mode="wait">
          <LayoutContent $theme={theme} $fullWidth={!task?.project_id || isMobile} $noPadding>
            <TaskForm />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default TaskDetailPage;
