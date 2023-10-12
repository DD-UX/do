'use client';

import {FC, useContext} from 'react';
import {LuArrowUpLeft} from 'react-icons/lu';
import {Button, Footer, Navbar, Sidebar} from 'flowbite-react';

import Loading from 'features/app/components/common/Loading';
import useTasksData from 'features/app/hooks/useTasksData';
import TaskProjectColumnItem from 'features/task/components/TaskProjectColumnItem';
import {TaskContext} from 'features/task/context/TaskContext';
import {headerContentFooterVariants} from 'features/theme/layout-variants/header-content-footer-variants';

type ProjectTasksColumnProps = {
  projectId: string;
  showGoToProjectButton?: boolean;
};

const ProjectTasksColumn: FC<ProjectTasksColumnProps> = ({
  projectId,
  showGoToProjectButton = true
}) => {
  const {tasks, isLoadingTasks, refreshTasks} = useTasksData({projectId});
  const {task: taskData} = useContext(TaskContext);

  return (
    <menu className={headerContentFooterVariants({layout: 'column'})}>
      <Navbar className="w-full flex items-center overflow-hidden">
        <h4 className="text-sm m-0 truncate text-gray-600 dark:text-gray-200">Project tasks</h4>
      </Navbar>
      <Sidebar className="w-full border-t border-gray-200 dark:border-gray-700">
        {isLoadingTasks ? (
          <Loading text="Loading related tasks" />
        ) : (
          <>
            <div>
              {tasks?.map((currentTask) => (
                <TaskProjectColumnItem
                  key={currentTask.id}
                  task={currentTask}
                  active={currentTask.id === taskData?.id}
                  onUpdate={refreshTasks}
                />
              ))}
              {(!Array.isArray(tasks) || (tasks && tasks?.length < 1)) && <p>No tasks</p>}
            </div>
          </>
        )}
      </Sidebar>
      {showGoToProjectButton && (
        <Footer className="p-4 rounded-none border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <Button fullSized as="a" outline href={`/projects/${projectId}`}>
            <span className="inline-flex gap-2 items-center">
              <LuArrowUpLeft />
              Go to project
            </span>
          </Button>
        </Footer>
      )}
    </menu>
  );
};

export default ProjectTasksColumn;
