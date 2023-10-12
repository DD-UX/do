import {FC, useMemo} from 'react';
import {Avatar, Dropdown, Flowbite, ThemeProps} from 'flowbite-react';
import {tv} from 'tailwind-variants';

import Loading from 'features/app/components/common/Loading';
import {AVATAR_THEME} from 'features/app/constants/theme-constants';
import {USER_NOT_ASSIGNED} from 'features/app/constants/users-constants';
import useUsersData from 'features/app/hooks/useUsersData';
import {UserProps} from 'lib/sdk/users/client/get';

const userSelectorItem = tv({
  base: ['grid', 'grid-flow-col', 'grid-cols-[2rem]', 'items-center', 'cursor-pointer'],
  variants: {
    showUserName: {
      true: ['grid-cols-[2rem_1fr]', 'gap-2']
    }
  }
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
    <Flowbite
      theme={
        {
          theme: {
            avatar: AVATAR_THEME
          }
        } as ThemeProps
      }
    >
      <Dropdown
        label="Dropdown"
        inline
        renderTrigger={() => (
          <div className={userSelectorItem({showUserName})}>
            <Avatar
              rounded
              size="xs"
              img={currentUser.avatar_url}
              alt={currentUser.user_name}
              theme={{
                root: {
                  base: 'flex justify-center items-center space-x-0 rounded'
                }
              }}
            />
            {showUserName && <p className="m-0">{currentUser.user_name}</p>}
          </div>
        )}
      >
        <Dropdown.Header>Select a user</Dropdown.Header>
        <Dropdown.Item
          value={USER_NOT_ASSIGNED.id}
          onClick={() => handleUserChange(USER_NOT_ASSIGNED.id)}
        >
          <div className={userSelectorItem({showUserName: true})}>
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
            <div className={userSelectorItem({showUserName: true})}>
              <Avatar rounded size="xs" img={avatar_url} alt={user_name} />
              <p className="m-0">{user_name}</p>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </Flowbite>
  );
};

export default UserSelector;
