import {FC, useContext, useEffect} from 'react';
import {Text, useToasts} from '@geist-ui/core';

import {TasksContext} from 'features/app/context/TasksContext';
import TasksListItem from 'features/task/components/TaskListItem';

const DashboardContent: FC = () => {
  const {setToast} = useToasts();
  const {tasks, error: tasksError} = useContext(TasksContext);

  useEffect(() => {
    if (tasksError) {
      setToast({
        text: `An error occurred while loading tasks.`,
        type: 'error'
      });
    }
  }, [tasksError]);

  return (
    <>
      {tasks?.map((task) => <TasksListItem key={task.id} task={task} />)}
      {!Array.isArray(tasks) || (tasks?.length < 1 && <Text>No available tasks</Text>)}
    </>
  );
};

export default DashboardContent;
