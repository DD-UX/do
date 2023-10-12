'use client';

import {FC, useContext, useState} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {headerContentFooterVariants} from 'features/app/layout-variants/header-content-footer-variants';
import ProjectTasksColumn from 'features/project/components/ProjectTasksColumn';
import TaskForm from 'features/task/components/TaskForm';
import TaskHeader from 'features/task/components/TaskHeader';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskDetailPage: FC = () => {
  const [onSaveColumnCallback, setOnSaveColumnCallback] = useState<() => void>(() => {});
  const {task} = useContext(TaskContext);

  return (
    <div className={appLayoutVariants()}>
      <AppNavigation />
      {task?.project_id && (
        <ProjectTasksColumn
          projectId={String(task?.project_id)}
          setOnSaveColumnCallback={setOnSaveColumnCallback}
        />
      )}
      <main
        className={headerContentFooterVariants({
          layout: 'content'
        })}
      >
        <TaskHeader />
        <section className={`bg-white dark:bg-gray-700 h-full overflow-y-auto`}>
          <TaskForm onSave={onSaveColumnCallback} />
        </section>
      </main>
    </div>
  );
};

export default TaskDetailPage;
