'use client';

import {FC} from 'react';
import {useRouter} from 'next/navigation';

import {deleteSession} from 'lib/sdk/session/delete';

const GithubSignInButton: FC = () => {
  const router = useRouter();

  // Delete session and refresh the page so if any guard has to act, it will
  const handleLogout = async () => {
    await deleteSession();
    router.refresh();
  };

  return (
    <button
      type="button"
      className="py-1 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      onClick={handleLogout}
    >
      Sign out
    </button>
  );
};

export default GithubSignInButton;
