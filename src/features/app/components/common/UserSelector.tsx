import {FC, useMemo} from 'react';
import {Avatar, Dropdown} from 'flowbite-react';
import {tv} from 'tailwind-variants';

import Loading from 'features/app/components/common/Loading';
import {USER_NOT_ASSIGNED} from 'features/app/constants/users-constants';
import useUsersData from 'features/app/hooks/useUsersData';
import {UserProps} from 'lib/sdk/users/client/get';

const userSelectorItem = tv({
  base: ['grid', 'grid-flow-col', 'gap-2', 'grid-cols-[2rem_1fr] ', 'cursor-pointer']
});

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
        <div className={userSelectorItem()}>
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
        <div className={userSelectorItem()}>
          <Avatar
            rounded
            size="xs"
            img={USER_NOT_ASSIGNED.avatar_url}
            alt={USER_NOT_ASSIGNED.name}
          />
          <p className="m-0">{USER_NOT_ASSIGNED.name}</p>
        </div>
      </Dropdown.Item>
      {users?.map(({id, user_name, avatar_url}) => (
        <Dropdown.Item key={id} value={id} onClick={() => handleUserChange(id)}>
          <div className={userSelectorItem()}>
            <Avatar rounded size="xs" img={avatar_url} alt={user_name} />
            <p className="m-0">{user_name}</p>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default UserSelector;
