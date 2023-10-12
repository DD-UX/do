'use client';

import {FC, useContext} from 'react';
import {Navbar} from 'flowbite-react';

import {TasksContext} from 'features/app/context/TasksContext';
import AddTaskForm from 'features/task/components/AddTaskForm';

const TasksHeader: FC = () => {
  const {refreshTasks} = useContext(TasksContext);

  return (
    <Navbar>
      <h4 className="text-sm m-0 truncate text-gray-600 dark:text-gray-200">Tasks</h4>
      <AddTaskForm onCreate={refreshTasks} />
    </Navbar>
  );
};

export default TasksHeader;
