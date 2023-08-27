import {FC} from 'react';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

const Dashboard: FC = async () => {
  const supabase = createServerComponentClient({cookies});

  const {data: tasks} = await supabase.from('tasks').select(`
    *,
    users(*)
  `);

  const {data: users} = await supabase.from('users').select(`
    id, user
  `);

  const {data: assignedTasks} = await supabase.from('tasks').select('*');

  console.log('tasks', tasks);
  console.log('assignedTasks', assignedTasks);

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
