'use client';

import {FC, useContext} from 'react';
import {useTheme} from '@geist-ui/core';
import styled, {css} from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {LayoutLink} from 'features/app/components/Layout';
import {
  STATUS_CANCELLED,
  STATUS_DONE,
  TASK_STATUSES
} from 'features/app/constants/status-constants';
import {TaskContext} from 'features/task/context/TaskContext';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

const TaskProjectColumnItemWrapper = styled.div<GeistThemeProps & {$isActive: boolean}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content 1fr min-content;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  align-items: center;

  ${({$theme, $isActive}) =>
    $isActive
      ? css`
          border-inline-start: 0.125rem solid ${$theme.palette.success};
        `
      : ''}
  & + & {
    border-block-start: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  }
`;

type TaskProjectColumnItemProps = {
  task: Pick<TaskProps, 'id' | 'title' | 'status' | 'assignee_id'>;
  active: boolean;
};

const TaskProjectColumnItem: FC<TaskProjectColumnItemProps> = ({task, active}) => {
  const theme = useTheme();
  const {updateTask} = useContext(TaskContext);
  const {id, title, status, assignee_id} = task;

  const updateStatus = async (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    await updateTask({...task, status: updatedStatus} as TaskProps);
  };

  const updateAssigneeUser = async (updatedUserId: UserProps['id']) => {
    await updateTask({...task, assignee_id: updatedUserId} as TaskProps);
  };

  return (
    <TaskProjectColumnItemWrapper $theme={theme} $isActive={active}>
      <StatusSelector status={status} onChange={updateStatus} />

      <LayoutLink
        $theme={theme}
        href={{
          pathname: `/tasks/${id}`
        }}
        passHref
      >
        <EllipsisText
          h6
          my={0}
          type={status === STATUS_DONE || status === STATUS_CANCELLED ? 'secondary' : 'default'}
          style={{
            textDecoration:
              status === STATUS_DONE || status === STATUS_CANCELLED ? 'line-through' : 'none'
          }}
        >
          {title}
        </EllipsisText>
      </LayoutLink>

      <UserSelector showUserName userId={assignee_id} onChange={updateAssigneeUser} />
    </TaskProjectColumnItemWrapper>
  );
};

export default TaskProjectColumnItem;
