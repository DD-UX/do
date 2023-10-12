'use client';

import {FC, useContext, useMemo} from 'react';
import {LuCalendarClock, LuTrash2} from 'react-icons/lu';
import {Button} from 'flowbite-react';
import NextLink from 'next/link';
import {twMerge} from 'tailwind-merge';

import ProjectSelector from 'features/app/components/common/ProjectSelector';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {
  STATUS_CANCELLED,
  STATUS_DONE,
  TASK_STATUSES
} from 'features/app/constants/status-constants';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import {TasksContext} from 'features/app/context/TasksContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import useTaskUpdate from 'features/app/hooks/useTaskUpdate';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

type TaskListItemProps = {
  task: TaskProps;
};

const TaskListItem: FC<TaskListItemProps> = ({task}) => {
  const {updateTask} = useTaskUpdate();
  const {deleteTask, refreshTasks} = useContext(TasksContext);
  const {id, title, created_at, status, assignee_id, project_id} = task;

  const linkClassName = useMemo(() => {
    const classNames = ['truncate', 'text-sm', 'cursor-pointer'];
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
      'grid-cols-[min-content_min-content_8rem_minmax(0,1fr)_8rem_7rem]',
      'gap-2',
      'p-2',
      'rounded-md',
      'items-center',
      'hover:bg-gray-200',
      'hover:dark:bg-gray-700',
      'transition-all'
    ];
    return twMerge(classNames);
  }, [status]);

  const removeTaskHandler = () => {
    deleteTask(task);
  };

  const updateStatus = async (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    await updateTask({...task, status: updatedStatus});
    refreshTasks();
  };

  const updateAssigneeUser = async (updatedUserId: UserProps['id']) => {
    await updateTask({...task, assignee_id: updatedUserId});
    refreshTasks();
  };

  const updateProjectId = async (updatedProjectId: UserProps['project_id']) => {
    await updateTask({...task, project_id: updatedProjectId || null});
    refreshTasks();
  };

  return (
    <div className={itemClassName}>
      <StatusSelector status={status} onChange={updateStatus} />
      <UserSelector userId={assignee_id} onChange={updateAssigneeUser} />
      <ProjectSelector value={project_id || NO_VALUE} onChange={updateProjectId} />
      <NextLink
        className={linkClassName}
        href={{
          pathname: `/tasks/${id}`
        }}
        passHref
      >
        {title}
      </NextLink>
      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <div>
          <LuCalendarClock size={12} />
        </div>
        {formatDateTime(created_at)}
      </div>
      <Button fullSized size="xs" type="button" color="failure" outline onClick={removeTaskHandler}>
        <span className="inline-flex gap-2">
          <LuTrash2 size={16} />
          Remove
        </span>
      </Button>
    </div>
  );
};

export default TaskListItem;
