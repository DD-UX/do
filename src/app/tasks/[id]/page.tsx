'use client';

import {FC, useContext} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import ProjectTasksColumn from 'features/project/components/ProjectTasksColumn';
import TaskForm from 'features/task/components/TaskForm';
import TaskHeader from 'features/task/components/TaskHeader';
import {TaskContext} from 'features/task/context/TaskContext';
import {headerContentFooterVariants} from 'features/theme/layout-variants/header-content-footer-variants';

const TaskDetailPage: FC = () => {
  const {task} = useContext(TaskContext);

  return (
    <div className={appLayoutVariants()}>
      <AppNavigation />
      {task?.project_id && <ProjectTasksColumn projectId={String(task?.project_id)} />}
      <main
        className={headerContentFooterVariants({
          layout: 'content'
        })}
      >
        <TaskHeader />
        <section className={`bg-white dark:bg-gray-700 h-full overflow-y-auto`}>
          <TaskForm />
        </section>
      </main>
    </div>
  );
};

export default TaskDetailPage;
