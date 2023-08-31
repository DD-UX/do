import {FC, useMemo, useRef, useState} from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  KeyCode,
  Loading,
  Text,
  useClickAway,
  useKeyboard,
  useTheme
} from '@geist-ui/core';
import styled from 'styled-components';

import StatusIcon from 'features/app/components/common/StatusIcon';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import {USER_NOT_ASSIGNED} from 'features/app/constants/users-constants';
import useUsersData from 'features/app/hooks/useUsersData';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {UserProps} from 'lib/sdk/users/client/get';

const UserSelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
`;
const UserSelectorLabel = styled.div<GeistThemeProps>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: repeat('auto-fit', min-content);
  gap: ${({$theme}) => $theme.layout.gapQuarter};
  align-items: center;
`;

const UserSelectorMenu = styled.menu<GeistThemeProps>`
  position: absolute;
  left: ${({$theme}) => `calc((${$theme.layout.gapHalf} + ${$theme.layout.gapQuarter}) * -1)`};
  top: ${({$theme}) => `calc(100% + ${$theme.layout.gapQuarter})`};
  z-index: ${Z_INDEX.dropdown};

  .btn .avatar-img {
    vertical-align: top !important;
  }
`;

type UserSelectorProps = {
  userId: UserProps['id'] | null;
  avatarSize?: string;
  showUserName?: boolean;
  onChange: (updatedUserId: UserProps['id']) => void;
};

const UserSelector: FC<UserSelectorProps> = ({
  userId,
  avatarSize = '1.25rem',
  showUserName = false,
  onChange
}) => {
  const theme = useTheme();
  const {users, isLoadingUsers} = useUsersData();
  const menuElementRef = useRef(null);
  const currentUser = useMemo(
    () => users?.find(({id}) => id === userId) || (USER_NOT_ASSIGNED as UserProps),
    [users, userId]
  );
  const [menuVisible, setMenuVisible] = useState(false);

  useClickAway(menuElementRef, () => {
    setMenuVisible(false);
  });

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible(false);
  }, [KeyCode.Escape]);

  const handleUserChange = (updatedUserId: UserProps['id']) => {
    onChange(updatedUserId);
  };

  return isLoadingUsers ? (
    <Loading>Loading users</Loading>
  ) : (
    <UserSelectorWrapper
      ref={menuElementRef}
      onClick={() => setMenuVisible((prevState) => !prevState)}
    >
      <UserSelectorLabel $theme={theme}>
        <Avatar
          width={String(avatarSize)}
          height={String(avatarSize)}
          src={currentUser.avatar_url}
          text={currentUser.user_name}
        />
        {showUserName && (
          <Text my={0} style={{textTransform: 'capitalize'}}>
            {currentUser.user_name}
          </Text>
        )}
      </UserSelectorLabel>
      {menuVisible && (
        <UserSelectorMenu $theme={theme}>
          <ButtonGroup vertical>
            <Button
              icon={
                <Avatar
                  width={String(avatarSize)}
                  height={String(avatarSize)}
                  text={USER_NOT_ASSIGNED.user_name}
                />
              }
              onClick={() => handleUserChange(USER_NOT_ASSIGNED.id)}
            >
              {USER_NOT_ASSIGNED.user_name}
            </Button>
            {users.map(({id, user_name, avatar_url}) => (
              <Button
                key={id}
                icon={
                  <Avatar
                    width={String(avatarSize)}
                    height={String(avatarSize)}
                    src={avatar_url}
                    text={user_name}
                  />
                }
                onClick={() => handleUserChange(id)}
              >
                {user_name}
              </Button>
            ))}
          </ButtonGroup>
        </UserSelectorMenu>
      )}
    </UserSelectorWrapper>
  );
};

export default UserSelector;
