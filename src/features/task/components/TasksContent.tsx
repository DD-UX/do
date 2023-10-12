import {FC, useContext} from 'react';
import {Text} from '@geist-ui/core';
import {appEntityContentVariants} from 'app/layout-variants/app-entity-detail-variants';

import {TasksContext} from 'features/app/context/TasksContext';
import TasksListItem from 'features/task/components/TaskListItem';

const TasksContent: FC = () => {
  const {tasks} = useContext(TasksContext);

  return (
    <section className={appEntityContentVariants()}>
      {tasks?.map((task) => <TasksListItem key={task.id} task={task} />)}
      {!Array.isArray(tasks) || (tasks?.length < 1 && <Text>No available tasks</Text>)}
    </section>
  );
};

export default TasksContent;
