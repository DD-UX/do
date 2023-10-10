'use client';

import {FC} from 'react';
import {LuFolders, LuListTodo, LuLogOut} from 'react-icons/lu';
import {Button, Sidebar} from 'flowbite-react';
import {usePathname, useRouter} from 'next/navigation';

import {LayoutNavigation} from 'features/app/components/common/Layout';
import {APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME} from 'features/app/constants/theme-constants';
import {deleteSession} from 'lib/sdk/session/client/delete';

const AppNavigation: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <LayoutNavigation aria-label="Do sidebar">
      <Sidebar.Items className="h-full grid">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/projects" active={pathname.startsWith('/projects')} icon={LuFolders}>
            Projects
          </Sidebar.Item>
          <Sidebar.Item href="/tasks" active={pathname.startsWith('/tasks')} icon={LuListTodo}>
            Tasks
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mt-auto">
          <Button
            fullSized
            color="logout"
            theme={APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME}
            onClick={handleLogout}
          >
            <span className="inline-flex gap-2 items-center">
              <LuLogOut />
              Log out
            </span>
          </Button>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </LayoutNavigation>
  );
};

export default AppNavigation;
