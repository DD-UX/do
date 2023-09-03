import {FC, useContext} from 'react';
import {Text} from '@geist-ui/core';

import {TasksContext} from 'features/app/context/TasksContext';
import TasksListItem from 'features/task/components/TaskListItem';

const DashboardContent: FC = () => {
  const {tasks} = useContext(TasksContext);

  return (
    <>
      {tasks?.map((task) => <TasksListItem key={task.id} task={task} />)}
      {!Array.isArray(tasks) || (tasks?.length < 1 && <Text>No available tasks</Text>)}
    </>
  );
};

export default DashboardContent;
