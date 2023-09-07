'use client';

import {FC, useContext, useRef} from 'react';
import {Spacer, Text, useTheme} from '@geist-ui/core';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {LayoutColumn, LayoutColumnHeader} from 'features/app/components/Layout';
import {ProjectContext} from 'features/project/context/ProjectContext';
import AddTaskForm from 'features/task/components/AddTaskForm';
import TaskProjectColumnItem from 'features/task/components/TaskProjectColumnItem';

const ProjectTasksColumn: FC = () => {
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {project, isLoadingProject, refreshProject} = useContext(ProjectContext);

  return (
    project && (
      <LayoutColumn $theme={theme} ref={menuElementRef}>
        <LayoutColumnHeader $theme={theme}>
          <AddTaskForm
            projectId={project?.id || null}
            autoFocus={false}
            onCreate={() => refreshProject()}
          />
        </LayoutColumnHeader>
        <Spacer h={0.5} />
        {isLoadingProject ? (
          <EllipsisText>Loading...</EllipsisText>
        ) : (
          <>
            <EllipsisText h2>Related tasks</EllipsisText>
            {project?.tasks?.map((currentTask) => (
              <TaskProjectColumnItem key={currentTask.id} task={currentTask} active={false} />
            ))}
            {(!Array.isArray(project?.tasks) || (project?.tasks && project?.tasks?.length < 1)) && (
              <Text>No available tasks</Text>
            )}
          </>
        )}
      </LayoutColumn>
    )
  );
};

export default ProjectTasksColumn;
