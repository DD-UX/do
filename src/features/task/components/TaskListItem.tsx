'use client';

import {FC, useContext} from 'react';
import {Button, useTheme} from '@geist-ui/core';
import Calendar from '@geist-ui/icons/calendar';
import XIcon from '@geist-ui/icons/x';
import NextLink from 'next/link';
import styled from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {LayoutLink} from 'features/app/components/Layout';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import {TasksContext} from 'features/app/context/TasksContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

const TaskListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content minmax(0, 1fr) 10rem 10rem 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf} 0;
  align-items: center;

  & + & {
    border-block-start: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  }
`;

type TaskListItemProps = {
  task: TaskProps;
};

const TaskListItem: FC<TaskListItemProps> = ({task}) => {
  const theme = useTheme();
  const {deleteTask, updateTask} = useContext(TasksContext);
  const {id, title, created_at, status, assignee_id} = task;

  const removeTaskHandler = () => {
    deleteTask(task);
  };

  const updateStatus = async (updatedStatus: (typeof TASK_STATUSES)[number]) => {
    await updateTask({...task, status: updatedStatus});
  };

  const updateAssigneeUser = async (updatedUserId: UserProps['id']) => {
    await updateTask({...task, assignee_id: updatedUserId});
  };

  return (
    <TaskListItemWrapper $theme={theme}>
      <StatusSelector status={status} onChange={updateStatus} />

      <NextLink href={`/tasks/${id}`} passHref>
        <LayoutLink $theme={theme}>
          <EllipsisText h6 my={0}>
            {title}
          </EllipsisText>
        </LayoutLink>
      </NextLink>

      <UserSelector showUserName userId={assignee_id} onChange={updateAssigneeUser} />

      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <span>
          <Calendar size={12} />
        </span>
        {formatDateTime(created_at)}
      </div>

      <Button
        auto
        icon={<XIcon />}
        px={0.4}
        scale={0.75}
        type="error"
        ghost
        onClick={removeTaskHandler}
      />
    </TaskListItemWrapper>
  );
};

export default TaskListItem;
