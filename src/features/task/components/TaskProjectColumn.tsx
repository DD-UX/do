'use client';

import {FC, useContext, useRef} from 'react';
import {
  Button,
  Keyboard,
  KeyCode,
  KeyMod,
  Spacer,
  Text,
  useKeyboard,
  useTheme
} from '@geist-ui/core';
import ArrowLeft from '@geist-ui/icons/arrowLeft';
import {redirect} from 'next/navigation';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {LayoutColumn, LayoutColumnHeader} from 'features/app/components/Layout';
import useProjectByTask from 'features/app/hooks/useProjectByTask';
import AddProjectForm from 'features/project/components/AddProjectForm';
import TaskProjectColumnItem from 'features/task/components/TaskProjectColumnItem';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskProjectColumn: FC = () => {
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {task} = useContext(TaskContext);
  const {project, isLoadingProject} = useProjectByTask(task);

  const handleGoBack = () => {
    redirect('/');
  };

  // Reset form on Escape
  useKeyboard(() => {
    handleGoBack();
  }, [KeyMod.CtrlCmd, KeyCode.KEY_L]);

  return (
    <LayoutColumn $theme={theme} ref={menuElementRef}>
      <LayoutColumnHeader $theme={theme}>
        <Button
          auto
          tabIndex={0}
          icon={<ArrowLeft />}
          px={0.6}
          scale={0.75}
          type="default"
          ghost
          onClick={handleGoBack}
        >
          List
          <Spacer inline w={0.5} />
          <Keyboard command scale={0.5}>
            L
          </Keyboard>
        </Button>
        <AddProjectForm focusPriority={false} />
      </LayoutColumnHeader>
      <Spacer h={0.5} />
      {isLoadingProject ? (
        <EllipsisText>Loading...</EllipsisText>
      ) : (
        <>
          <EllipsisText h2>{project?.title}</EllipsisText>
          {project?.tasks?.map((task) => <TaskProjectColumnItem key={task.id} task={task} />)}
          {!Array.isArray(project?.tasks) ||
            (project?.tasks?.length < 1 && <Text>No available tasks</Text>)}
        </>
      )}
    </LayoutColumn>
  );
};

export default TaskProjectColumn;
