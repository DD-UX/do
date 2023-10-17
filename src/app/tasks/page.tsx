'use client';

import {FC} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {headerContentFooterVariants} from 'features/app/layout-variants/header-content-footer-variants';
import TasksContent from 'features/task/components/TasksContent';
import TasksHeader from 'features/task/components/TasksHeader';

const TasksPage: FC = () => {
  return (
    <div className={appLayoutVariants()}>
      <AppNavigation />
      <main
        className={headerContentFooterVariants({
          layout: 'content'
        })}
      >
        <TasksHeader />
        <TasksContent />
      </main>
    </div>
  );
};

export default TasksPage;
