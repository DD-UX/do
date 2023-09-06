'use client';

import {FC, MouseEvent, useRef, useState} from 'react';
import {
  Button,
  Keyboard,
  KeyCode,
  KeyMod,
  Spacer,
  useClickAway,
  useKeyboard,
  useMediaQuery,
  useTheme
} from '@geist-ui/core';
import ArrowLeft from '@geist-ui/icons/arrowLeft';
import Menu from '@geist-ui/icons/menu';
import {AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/navigation';

import {LayoutHeader, LayoutHeading} from 'features/app/components/Layout';
import SignOutButton from 'features/auth/components/SignOutButton';
import ProjectTasksColumn from 'features/project/components/ProjectTasksColumn';
import AddTaskForm from 'features/task/components/AddTaskForm';

const ProjectHeader: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const isMobile = useMediaQuery('mobile');
  const [menuVisible, setMenuVisible] = useState(!isMobile);

  const handleOpenMenu = (event: MouseEvent) => {
    // Avoid event propagates and trigger clicking away logic that closes the menu
    event.stopPropagation();
    setMenuVisible(true);
  };

  const handleGoToTasks = () => {
    router.push('/tasks');
  };

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible((prevState) => !prevState);
  }, [KeyMod.CtrlCmd, KeyCode.KEY_M]);

  useClickAway(menuElementRef, () => {
    setMenuVisible(false);
  });

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible(false);
  }, [KeyCode.Escape]);
  // Reset form on Escape
  useKeyboard(() => {
    handleGoToTasks();
  }, [KeyMod.CtrlCmd, KeyCode.KEY_T]);

  return (
    <>
      <LayoutHeader $theme={theme} $fullWidth={isMobile}>
        {isMobile && (
          <Button
            auto
            tabIndex={0}
            icon={<Menu />}
            px={0.6}
            scale={0.75}
            type="secondary"
            ghost
            onClick={handleOpenMenu}
          >
            Menu
            <Spacer inline w={0.5} />
            <Keyboard command scale={0.5}>
              M
            </Keyboard>
          </Button>
        )}

        <Button
          auto
          tabIndex={0}
          icon={<ArrowLeft />}
          px={0.6}
          scale={0.75}
          type="default"
          ghost
          onClick={handleGoToTasks}
        >
          Tasks
          <Spacer inline w={0.5} />
          <Keyboard command scale={0.5}>
            T
          </Keyboard>
        </Button>
        <LayoutHeading>Task</LayoutHeading>
        <AddTaskForm autoFocus={false} />
        <SignOutButton />
      </LayoutHeader>
      <AnimatePresence mode="wait">
        {(menuVisible || !isMobile) && <ProjectTasksColumn />}
      </AnimatePresence>
    </>
  );
};

export default ProjectHeader;
