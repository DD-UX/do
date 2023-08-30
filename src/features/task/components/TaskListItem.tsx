'use client';

import {FC, useContext} from 'react';
import {Button, useTheme} from '@geist-ui/core';
import Calendar from '@geist-ui/icons/calendar';
import XIcon from '@geist-ui/icons/x';
import NextLink from 'next/link';
import styled from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import StatusIcon from 'features/app/components/common/StatusIcon';
import {LayoutLink} from 'features/app/components/Layout';
import {TasksContext} from 'features/app/context/TasksContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {TaskProps} from 'lib/sdk/tasks/client/get';

const TaskListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content minmax(0, 1fr) 10rem 2.5rem;
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
  const {deleteTask} = useContext(TasksContext);
  const {id, title, created_at, status} = task;

  const removeTaskHandler = () => {
    deleteTask(task);
  };

  return (
    <TaskListItemWrapper $theme={theme}>
      <div>
        <StatusIcon status={status} />
      </div>

      <NextLink href={`/tasks/${id}`} passHref>
        <LayoutLink $theme={theme}>
          <EllipsisText h6 my={0}>
            {title}
          </EllipsisText>
        </LayoutLink>
      </NextLink>

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
