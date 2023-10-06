import {FC, useMemo} from 'react';
import {Avatar, Dropdown} from 'flowbite-react';

import Loading from 'features/app/components/common/Loading';
import {USER_NOT_ASSIGNED} from 'features/app/constants/users-constants';
import useUsersData from 'features/app/hooks/useUsersData';
import {UserProps} from 'lib/sdk/users/client/get';

type UserSelectorProps = {
  userId: UserProps['id'] | null;
  showUserName?: boolean;
  onChange: (updatedUserId: UserProps['id']) => void;
};

const UserSelector: FC<UserSelectorProps> = ({userId, showUserName = false, onChange}) => {
  const {users, isLoadingUsers} = useUsersData();
  const currentUser = useMemo(
    () => (users && users?.find(({id}) => id === userId)) || (USER_NOT_ASSIGNED as UserProps),
    [users, userId]
  );

  const handleUserChange = (updatedUserId: UserProps['id']) => {
    onChange(updatedUserId);
  };

  return isLoadingUsers ? (
    <Loading text="Loading users" />
  ) : (
    <Dropdown
      label="Dropdown"
      inline
      renderTrigger={() => (
        <div className="grid grid-auto-col gap-1 grid-cols-[2rem_1fr] cursor-pointer">
          <Avatar rounded size="xs" img={currentUser.avatar_url} alt={currentUser.user_name} />
          {showUserName && <p className="m-0">{currentUser.user_name}</p>}
        </div>
      )}
    >
      <Dropdown.Header>Select a user</Dropdown.Header>
      <Dropdown.Item
        value={USER_NOT_ASSIGNED.id}
        onClick={() => handleUserChange(USER_NOT_ASSIGNED.id)}
      >
        <Avatar rounded size="xs" img={USER_NOT_ASSIGNED.avatar_url} alt={USER_NOT_ASSIGNED.name} />
        {USER_NOT_ASSIGNED.name}
      </Dropdown.Item>
      {users?.map(({id, user_name, avatar_url}) => (
        <Dropdown.Item key={id} value={id} onClick={() => handleUserChange(id)}>
          <Avatar rounded size="xs" img={avatar_url} alt={user_name} />
          {user_name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default UserSelector;
