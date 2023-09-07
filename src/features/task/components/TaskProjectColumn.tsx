'use client';

import {FC, useContext, useRef} from 'react';
import {Spacer, Text, useTheme} from '@geist-ui/core';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {LayoutColumn, LayoutColumnHeader} from 'features/app/components/Layout';
import AddProjectForm from 'features/project/components/AddProjectForm';
import TaskProjectColumnItem from 'features/task/components/TaskProjectColumnItem';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskProjectColumn: FC = () => {
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {task, project, isLoadingProject} = useContext(TaskContext);

  return (
    <LayoutColumn $theme={theme} ref={menuElementRef}>
      <LayoutColumnHeader $theme={theme}>
        <AddProjectForm autoFocus={false} />
      </LayoutColumnHeader>
      <Spacer h={0.5} />
      {isLoadingProject ? (
        <EllipsisText>Loading...</EllipsisText>
      ) : (
        <>
          <EllipsisText h2>{project?.title}</EllipsisText>
          {project?.tasks?.map((currentTask) => (
            <TaskProjectColumnItem
              key={currentTask.id}
              task={currentTask}
              active={currentTask.id === task?.id}
            />
          ))}
          {(!Array.isArray(project?.tasks) || (project?.tasks && project?.tasks?.length < 1)) && (
            <Text>No available tasks</Text>
          )}
        </>
      )}
    </LayoutColumn>
  );
};

export default TaskProjectColumn;
