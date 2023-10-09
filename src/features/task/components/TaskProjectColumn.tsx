'use client';

import {FC, useContext, useRef, useState} from 'react';
import {Button, Text, useTheme} from '@geist-ui/core';
import ArrowUpLeft from '@geist-ui/icons/arrowUpLeft';
import {useRouter} from 'next/navigation';

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
  const router = useRouter();
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {task, project, isLoadingProject} = useContext(TaskContext);
  const [isOpeningProject, setIsOpeningProject] = useState(false);

  const handleGoToProject = async () => {
    try {
      setIsOpeningProject(true);
      await router.push(`/projects/${project?.id}`);
    } catch (error) {
      setIsOpeningProject(false); // no need to handle it within finally since the page will be re-rendered
    }
  };

  return (
    <LayoutColumn $theme={theme} ref={menuElementRef}>
      <LayoutColumnHeader>
        <AddProjectForm autoFocus={false} />
      </LayoutColumnHeader>
      <LayoutColumnContent $theme={theme}>
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
      <Button
        width="100%"
        ghost
        mt="auto"
        icon={<ArrowUpLeft />}
        htmlType="button"
        type="secondary"
        loading={isOpeningProject}
        onClick={handleGoToProject}
      >
        Go to project
      </Button>
    </LayoutColumn>
  );
};

export default TaskProjectColumn;
