'use client';

import {FC, useContext} from 'react';
import {Navbar} from 'flowbite-react';

import AddTaskForm from 'features/task/components/AddTaskForm';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskHeader: FC = () => {
  const {task, refreshProject} = useContext(TaskContext);

  return (
    <Navbar fluid>
      <h4 className="text-sm m-0 truncate text-gray-600 dark:text-gray-200">Task</h4>
      <AddTaskForm
        autoFocus={false}
        {...(task?.project_id && {projectId: task?.project_id})}
        onCreate={refreshProject}
      />
    </Navbar>
  );
};

export default TaskHeader;
