'use client';

import {FC, useContext} from 'react';
import {AnimatePresence} from 'framer-motion';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import AddTaskForm from 'features/task/components/AddTaskForm';
import TaskProjectColumn from 'features/task/components/TaskProjectColumn';
import {TaskContext} from 'features/task/context/TaskContext';

const TaskHeader: FC = () => {
  const {task, refreshProject} = useContext(TaskContext);
  return (
    <>
      <LayoutHeader $fullWidth>
        <LayoutHeading>Task</LayoutHeading>
        <AddTaskForm
          autoFocus={false}
          {...(task?.project_id && {projectId: task?.project_id})}
          onCreate={refreshProject}
        />
      </LayoutHeader>
      {task?.project_id && (
        <AnimatePresence mode="wait">
          <TaskProjectColumn />
        </AnimatePresence>
      )}
    </>
  );
};

export default TaskHeader;
