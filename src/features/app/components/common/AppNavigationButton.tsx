import {FC} from 'react';
import {Text, useTheme} from '@geist-ui/core';
import {usePathname, useRouter} from 'next/navigation';
import styled, {css} from 'styled-components';

import {TRANSITION_DURATION} from 'features/app/constants/ui-constants';
import {GeistIconModel} from 'lib/geist/geist-icon-model';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

const AppNavigationButtonWrapper = styled.button.attrs({
  type: 'button'
})<GeistThemeProps & {$isActive: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-variant: all-small-caps;
  font-weight: 500;
  width: 100%;
  transition: background-color ${TRANSITION_DURATION}s linear;

  ${({$theme, $isActive}) => css`
    padding: ${$theme.layout.gapQuarter};
    background-color: ${$isActive ? $theme.palette.accents_1 : $theme.palette.accents_2};
    border: 0.0625rem solid ${$isActive ? $theme.palette.secondary : $theme.palette.border};
    border-radius: ${$theme.layout.radius};
  `}

  &:hover {
    ${({$theme}) => css`
      background-color: ${$theme.palette.accents_1};
    `}
  }
`;

type AppNavigationButtonProps = {
  Icon: GeistIconModel;
  text: string;
} & (
  | {
      route: string;
    }
  | {
      onClick: () => void;
    }
);

const AppNavigationButton: FC<AppNavigationButtonProps> = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const {Icon, text} = props; // can't spread route and onClick since they are mutually exclusive

  const handleClick = () => {
    if ('route' in props) {
      router.push(props.route);
    }

    if ('onClick' in props) {
      props.onClick();
    }
  };

  return (
    <AppNavigationButtonWrapper
      $theme={theme}
      $isActive={'route' in props && pathname.startsWith(props.route)}
      onClick={handleClick}
    >
      <Icon scale={0.8} />
      <Text my={0} font={0.7}>
        {text}
      </Text>
    </AppNavigationButtonWrapper>
  );
};

export default AppNavigationButton;
