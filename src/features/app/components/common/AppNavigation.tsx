'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import Folder from '@geist-ui/icons/folder';
import List from '@geist-ui/icons/list';
import LogOut from '@geist-ui/icons/logOut';
import {usePathname, useRouter} from 'next/navigation';

import AppNavigationButton from 'features/app/components/common/AppNavigationButton';
import {LayoutNavigation} from 'features/app/components/common/Layout';
import {deleteSession} from 'lib/sdk/session/client/delete';

const AppNavigation: FC = () => {
  const router = useRouter();
  const theme = useTheme();

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <LayoutNavigation $theme={theme}>
      <AppNavigationButton Icon={Folder} text="Projects" route="/projects" />
      <AppNavigationButton Icon={List} text="Tasks" route="/tasks" />

      <div style={{marginBlockStart: 'auto'}}>
        <AppNavigationButton Icon={LogOut} text="Log out" onClick={handleLogout} />
      </div>
    </LayoutNavigation>
  );
};

export default AppNavigation;
