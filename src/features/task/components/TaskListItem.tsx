'use client';

import {FC, useState} from 'react';
import {Button, Toggle, useTheme, useToasts} from '@geist-ui/core';
import XIcon from '@geist-ui/icons/x';
import styled from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {deleteTask} from 'lib/sdk/tasks/client/delete';
import {TaskProps} from 'lib/sdk/tasks/client/get';

const TaskListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1.5rem minmax(0, 1fr) 8rem 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf} 0;
  align-items: center;

  & + & {
    border-block-start: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  }

  a {
    text-decoration: none;
  }
`;

type TaskListItemProps = {
  task: TaskProps;
};

const TaskListItem: FC<TaskListItemProps> = ({task}) => {
  const theme = useTheme();
  const {setToast} = useToasts();
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const {id, title, created_at} = task;

  const removeTaskHandler = async () => {
    try {
      setIsDeletingTask(true);
      console.log('id', id);
      await deleteTask(id);
      setToast({
        text: `${title} task deleted successfully`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: `An error occurred while deleting ${title} task.`,
        type: 'error'
      });
    } finally {
      setIsDeletingTask(false);
    }
  };

  // Handle add task
  const updateTaskHandler = async (updatedTask: TaskProps) => {
    console.log('updatedTask', updatedTask);
    try {
      setIsUpdatingTask(true);
      setToast({
        text: `Task ${task.title} updated successfully.`,
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: `An error occurred while updating ${task.title} task.`,
        type: 'error'
      });
    } finally {
      setIsUpdatingTask(false);
    }
  };

  return (
    <TaskListItemWrapper $theme={theme}>
      <div>
        <Toggle
          disabled={isUpdatingTask}
          initialChecked={true}
          checked={true}
          onChange={() => updateTaskHandler({})}
        />
      </div>
      <EllipsisText h5 my={0}>
        {title}
      </EllipsisText>
      <div style={{textAlign: 'end'}}>{formatDateTime(created_at)}</div>
      <Button
        auto
        icon={<XIcon />}
        px={0.4}
        scale={0.75}
        type="error"
        ghost
        loading={isDeletingTask}
        onClick={removeTaskHandler}
      />
    </TaskListItemWrapper>
  );
};

export default TaskListItem;
