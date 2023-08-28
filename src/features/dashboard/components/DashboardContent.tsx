import {FC, useEffect, useState} from 'react';
import {Text, useToasts} from '@geist-ui/core';

import TasksListItem from 'features/task/components/TaskListItem';
import {getTasks, TaskProps} from 'lib/sdk/tasks/get';

const DashboardContent: FC = () => {
  const {setToast} = useToasts();
  const [tasksList, setTasksList] = useState<TaskProps[]>(null);

  const getTasksHandler = async () => {
    const {tasks, error: tasksError} = await getTasks();

    if (tasksError) {
      setToast({
        text: `An error occurred while loading tasks.`,
        type: 'error'
      });
    }

    setTasksList(tasks);
  };

  useEffect(() => {
    getTasksHandler();
  }, []);

  return (
    <>
      {tasksList?.map((task) => <TasksListItem key={task.id} task={task} />)}
      {tasksList?.length < 1 && <Text>No available tasks</Text>}
    </>
  );
};

export default DashboardContent;
