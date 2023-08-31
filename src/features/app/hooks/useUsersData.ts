import {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getUsers, UserProps} from 'lib/sdk/users/client/get';

type useUsersDataValues = {
  users: UserProps[] | null;
  error: PostgrestError | null;
  isLoadingUsers: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  refreshUsers(): void;
};

/*
 * This Hook will pull down all the users
 */
function useUsersData(): useUsersDataValues {
  const {setToast} = useToasts();
  const [usersData, setUsersData] = useState<UserProps[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [search, setSearch] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const {users: usersList, error} = await getUsers({search});
      setError(error);
      setUsersData(usersList);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading users.',
        type: 'error'
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const memoizedReturnValue: useUsersDataValues = useMemo(() => {
    return {
      users: usersData,
      error,

      isLoadingUsers,
      refreshUsers: loadUsers,
      setSearch
    };
  }, [usersData, isLoadingUsers]);

  return memoizedReturnValue;
}

export default useUsersData;
