import {FC} from 'react';

import {getTasks} from 'lib/sdk/tasks/get';
import {getUsers} from 'lib/sdk/users/get';

const Dashboard: FC = async () => {
  const {tasks, error: tasksError} = await getTasks();
  const {users, error: usersError} = await getUsers(['id', 'user_name', 'avatar_url']);

  console.log('tasks', tasks);
  console.log('users', users);

  return (
    <main className="flex flex-col gap-1">
      <div className="max-w-[300px]">
        {tasks?.map(({id, title, content, assignee_id, users}) => (
          <div key={id}>
            <h2 className="text-2xl">{title}</h2>
            <p>{content}</p>
            <p>
              Created by:{' '}
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {users.name}
              </span>
            </p>
            <p>
              Assigned to:{' '}
              {assignee_id ? (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                  {users.name}
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Not assigned
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
