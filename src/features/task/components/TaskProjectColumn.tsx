'use client';

import {FC, useContext, useRef} from 'react';
import {LuArrowUpLeft} from 'react-icons/lu';
import {Text, useTheme} from '@geist-ui/core';
import {Button} from 'flowbite-react';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {
  LayoutColumn,
  LayoutColumnContent,
  LayoutColumnHeader
} from 'features/app/components/common/Layout';
import AddProjectForm from 'features/project/components/AddProjectForm';
import TaskProjectColumnItem from 'features/task/components/TaskProjectColumnItem';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskProjectColumn: FC = () => {
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {task, project, isLoadingProject} = useContext(TaskContext);

  return (
    <LayoutColumn $theme={theme} ref={menuElementRef}>
      <LayoutColumnHeader>
        <AddProjectForm autoFocus={false} />
      </LayoutColumnHeader>
      <LayoutColumnContent>
        {isLoadingProject ? (
          <EllipsisText>Loading...</EllipsisText>
        ) : (
          <>
            <EllipsisText h2>{project?.title}</EllipsisText>
            <div>
              {project?.tasks?.map((currentTask) => (
                <TaskProjectColumnItem
                  key={currentTask.id}
                  task={currentTask}
                  active={currentTask.id === task?.id}
                />
              ))}
              {(!Array.isArray(project?.tasks) ||
                (project?.tasks && project?.tasks?.length < 1)) && <Text>No available tasks</Text>}
            </div>
          </>
        )}
      </LayoutColumnContent>
      <div className="p-4">
        <Button as="a" outline href={`/projects/${project?.id}`}>
          <span className="inline-flex gap-2 items-center">
            <LuArrowUpLeft />
            Go to project
          </span>
        </Button>
      </div>
    </LayoutColumn>
  );
};

export default TaskProjectColumn;
