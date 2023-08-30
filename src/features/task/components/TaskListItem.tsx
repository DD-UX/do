'use client';

import {FC, useContext} from 'react';
import {Badge, Button, Link, useTheme} from '@geist-ui/core';
import XIcon from '@geist-ui/icons/x';
import NextLink from 'next/link';
import styled from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {TasksContext} from 'features/app/context/TasksContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {TaskProps} from 'lib/sdk/tasks/client/get';

const TaskListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content minmax(0, 1fr) 8rem 2.5rem;
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
  const {deleteTask} = useContext(TasksContext);
  const {id, title, created_at, status} = task;

  const removeTaskHandler = () => {
    deleteTask(task);
  };

  return (
    <TaskListItemWrapper $theme={theme}>
      <div>
        <Badge width="100px">{status}</Badge>
      </div>

      <NextLink href={`/tasks/${id}`} passHref>
        <Link>
          <EllipsisText h6 my={0} type="success">
            {title}
          </EllipsisText>
        </Link>
      </NextLink>

      <div style={{textAlign: 'end'}}>{formatDateTime(created_at)}</div>

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
