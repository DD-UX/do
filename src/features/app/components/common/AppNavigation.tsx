'use client';

import {FC} from 'react';
import {LuFolders, LuListChecks, LuLogOut} from 'react-icons/lu';
import {Button, Sidebar} from 'flowbite-react';
import {useRouter} from 'next/navigation';

import {deleteSession} from 'lib/sdk/session/client/delete';

const AppNavigation: FC = () => {
  const router = useRouter();

  const logoutThemeButton = {
    color: {
      logout:
        'transition-all text-gray-900 bg-white border border-gray-300 enabled:hover:bg-white focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-800 dark:enabled:hover:bg-gray-600 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-800'
    }
  };

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <>
      <Sidebar
        aria-label="Do sidebar"
        style={{
          gridRowStart: 'app-header-start',
          gridRowEnd: 'app-content-end',
          gridColumnStart: 'app-navigation-start',
          gridColumnEnd: ' app-navigation-end'
        }}
      >
        <Sidebar.Items className="h-full grid">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/projects" icon={LuFolders}>
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/tasks" icon={LuListChecks}>
              Tasks
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="mt-auto">
            <Button fullSized color="logout" theme={logoutThemeButton} onClick={handleLogout}>
              <span className="inline-flex gap-2 items-center">
                <LuLogOut />
                Log out
              </span>
            </Button>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default AppNavigation;
