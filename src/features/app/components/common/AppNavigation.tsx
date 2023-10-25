'use client';

import {FC, useState} from 'react';
import {LuFolders, LuListTodo, LuLogOut} from 'react-icons/lu';
import {Button, Flowbite, Sidebar, ThemeProps} from 'flowbite-react';
import {usePathname, useRouter} from 'next/navigation';

import {
  APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME,
  APP_NAVIGATION_SIDEBAR_THEME
} from 'features/app/constants/theme-constants';
import {deleteSession} from 'lib/sdk/session/client/delete';

const AppNavigation: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <Flowbite
      theme={
        {
          theme: {
            sidebar: APP_NAVIGATION_SIDEBAR_THEME,
            button: APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME
          }
        } as ThemeProps
      }
    >
      <Sidebar
        collapsed={collapsed}
        aria-label="Do sidebar"
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className="group/app-navigation"
      >
        <Sidebar.Items className="h-full grid">
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/projects"
              active={pathname.startsWith('/projects')}
              icon={LuFolders}
            >
              Projects
            </Sidebar.Item>
            <Sidebar.Item href="/tasks" active={pathname.startsWith('/tasks')} icon={LuListTodo}>
              Tasks
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="mt-auto">
            <Button fullSized color="logout" onClick={handleLogout}>
              <span className="inline-flex gap-2 items-center">
                <LuLogOut size="24" style={{flexShrink: 0}} />
                <span className="truncate">Log out</span>
              </span>
            </Button>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Flowbite>
  );
};

export default AppNavigation;
