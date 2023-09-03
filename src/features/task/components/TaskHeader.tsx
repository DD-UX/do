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
import Menu from '@geist-ui/icons/menu';
import {AnimatePresence} from 'framer-motion';

import {LayoutHeader, LayoutHeading} from 'features/app/components/Layout';
import SignOutButton from 'features/auth/components/SignOutButton';
import AddTaskForm from 'features/task/components/AddTaskForm';
import TaskProjectColumn from 'features/task/components/TaskProjectColumn';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskHeader: FC = () => {
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {task} = useContext(TaskContext);
  const isMobile = useMediaQuery('mobile');
  const [menuVisible, setMenuVisible] = useState(!isMobile);

  const handleOpenMenu = (event: MouseEvent) => {
    // Avoid event propagates and trigger clicking away logic that closes the menu
    event.stopPropagation();
    setMenuVisible(true);
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

  return (
    <>
      <LayoutHeader $theme={theme} $fullWidth={!task?.project_id || isMobile}>
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
        <LayoutHeading>Task</LayoutHeading>
        <AddTaskForm autoFocus={false} />
        <SignOutButton />
      </LayoutHeader>
      {task?.project_id && (
        <AnimatePresence mode="wait">
          {(menuVisible || !isMobile) && <TaskProjectColumn key="motion_layout_column" />}
        </AnimatePresence>
      )}
    </>
  );
};

export default TaskHeader;
