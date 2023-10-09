'use client';

import {FC, useContext} from 'react';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import {TasksContext} from 'features/app/context/TasksContext';
import AddTaskForm from 'features/task/components/AddTaskForm';

const TasksHeader: FC = () => {
  const {refreshTasks} = useContext(TasksContext);

  return (
    <>
      <LayoutHeader $fullWidth>
        <LayoutHeading>Tasks</LayoutHeading>
        <AddTaskForm onCreate={refreshTasks} />
      </LayoutHeader>
    </>
  );
};

export default TasksHeader;
