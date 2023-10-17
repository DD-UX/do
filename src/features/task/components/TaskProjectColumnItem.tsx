'use client';

import {FC, useMemo} from 'react';
import NextLink from 'next/link';
import {twMerge} from 'tailwind-merge';

import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {
  STATUS_CANCELLED,
  STATUS_DONE,
  TASK_STATUSES
} from 'features/app/constants/status-constants';
import useTaskUpdate from 'features/app/hooks/useTaskUpdate';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

type TaskProjectColumnItemProps = {
  task: Pick<TaskProps, 'id' | 'title' | 'status' | 'assignee_id'>;
  active: boolean;
  onUpdate(): void;
};

const TaskProjectColumnItem: FC<TaskProjectColumnItemProps> = ({task, active, onUpdate}) => {
  const {updateTask} = useTaskUpdate();
  const {id, title, status, assignee_id} = task;

  const linkClassName = useMemo(() => {
    const classNames = ['truncate', 'col-span-2', 'text-sm', 'cursor-pointer'];
    if (status === STATUS_CANCELLED || status === STATUS_DONE) {
      classNames.push(...['line-through', 'opacity-50']);
    }
    return twMerge(classNames);
  }, [status]);

  const itemClassName = useMemo(() => {
    const classNames = [
      // layout
      'grid',
      'grid-rows-[min-content]',
      'grid-cols-[min-content_minmax(0,1fr)]',
      'gap-y-2',
      'gap-x-3',
      'p-2',
      'rounded-md',
      'items-center',
      'hover:bg-gray-200',
      'hover:dark:bg-gray-700',
      'transition-all'
    ];
    if (active) {
      classNames.push(...['bg-gray-200', 'dark:bg-gray-700']);
    }
    return twMerge(classNames);
  }, [status, active]);

  const updateStatus = async (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    await updateTask({...task, status: updatedStatus} as TaskProps);
    onUpdate();
  };

  const updateAssigneeUser = async (updatedUserId: UserProps['id']) => {
    await updateTask({...task, assignee_id: updatedUserId} as TaskProps);
    onUpdate();
  };

  return (
    <div className={itemClassName}>
      <NextLink
        className={linkClassName}
        href={{
          pathname: `/tasks/${id}`
        }}
        passHref
      >
        {title}
      </NextLink>

      <StatusSelector status={status} onChange={updateStatus} />
      <UserSelector showUserName userId={assignee_id} onChange={updateAssigneeUser} />
    </div>
  );
};

export default TaskProjectColumnItem;
