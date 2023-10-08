'use client';

import {FC} from 'react';
import {LuFolders, LuListChecks, LuLogOut} from 'react-icons/lu';
import {Sidebar} from 'flowbite-react';
import {useRouter} from 'next/navigation';

import {deleteSession} from 'lib/sdk/session/client/delete';

const AppNavigation: FC = () => {
  const router = useRouter();

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
            <Sidebar.CTA className="cursor-pointer mt-0" onClick={handleLogout}>
              <span className="grid grid-flow-col grid-cols-[min-content_1fr] gap-2 items-center">
                <LuLogOut />
                <span>Log out</span>
              </span>
            </Sidebar.CTA>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default AppNavigation;
