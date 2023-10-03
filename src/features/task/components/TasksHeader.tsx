'use client';

import {FC, useContext} from 'react';
import {useTheme} from '@geist-ui/core';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import {TasksContext} from 'features/app/context/TasksContext';
import AddTaskForm from 'features/task/components/AddTaskForm';

const TasksHeader: FC = () => {
  const theme = useTheme();
  const {refreshTasks} = useContext(TasksContext);

  return (
    <>
      <LayoutHeader $theme={theme} $fullWidth>
        <LayoutHeading>Tasks</LayoutHeading>
        <AddTaskForm onCreate={refreshTasks} />
      </LayoutHeader>
    </>
  );
};

export default TasksHeader;
