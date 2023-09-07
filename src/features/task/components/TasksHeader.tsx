'use client';

import {FC, MouseEvent, useContext, useRef, useState} from 'react';
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

import EllipsisText from 'features/app/components/common/EllipsisText';
import {
  LayoutColumn,
  LayoutColumnHeader,
  LayoutHeader,
  LayoutHeading
} from 'features/app/components/Layout';
import {TasksContext} from 'features/app/context/TasksContext';
import SignOutButton from 'features/auth/components/SignOutButton';
import AddProjectForm from 'features/project/components/AddProjectForm';
import AddTaskForm from 'features/task/components/AddTaskForm';

const TasksHeader: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {refreshTasks} = useContext(TasksContext);
  const isMobile = useMediaQuery('mobile');
  const [menuVisible, setMenuVisible] = useState(!isMobile);

  const handleGoProjects = () => {
    router.push('/projects');
  };

  const handleOpenMenu = (event: MouseEvent) => {
    // Avoid event propagates and trigger clicking away logic that closes the menu
    event.stopPropagation();
    setMenuVisible(true);
  };

  // Reset form on Escape
  useKeyboard(() => {
    handleGoProjects();
  }, [KeyMod.CtrlCmd, KeyCode.KEY_P]);

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
        <LayoutHeading>Tasks</LayoutHeading>
        <AddTaskForm onCreate={refreshTasks} />
        <SignOutButton />
      </LayoutHeader>
      <AnimatePresence mode="wait">
        {(menuVisible || !isMobile) && (
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
                onClick={handleGoProjects}
              >
                Projects
                <Spacer inline w={0.5} />
                <Keyboard command scale={0.5}>
                  P
                </Keyboard>
              </Button>
              <AddProjectForm autoFocus={false} />
            </LayoutColumnHeader>
            <Spacer h={0.5} />
            <EllipsisText h3> Other projects</EllipsisText>
          </LayoutColumn>
        )}
      </AnimatePresence>
    </>
  );
};

export default TasksHeader;
