import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';
import useSWR from 'swr';

import {USERS_DATA_SWR_KEY} from 'features/app/constants/swr-constants';
import {getUsers, UserProps} from 'lib/sdk/users/client/get';

type UseUsersDataValues = {
  users: UserProps[] | null;
  error: PostgrestError | null;
  isLoadingUsers: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  refreshUsers(): void;
};

/*
 * This Hook will pull down all the users
 */
function useUsersData(): UseUsersDataValues {
  const {setToast} = useToasts();
  const [search, setSearch] = useState('');
  const loadUsers = async () => getUsers({search});
  const {data, error, isLoading: isLoadingUsers, mutate} = useSWR(USERS_DATA_SWR_KEY, loadUsers);

  useEffect(() => {
    if (error) {
      setToast({
        text: 'An error occurred while loading users.',
        type: 'error'
      });
    }
  }, [error]);

  return {
    users: data?.users || null,
    error,

    isLoadingUsers,
    refreshUsers: async () => mutate(USERS_DATA_SWR_KEY),
    setSearch
  };
}

export default useUsersData;
