import {Text} from '@geist-ui/core';
import {motion} from 'framer-motion';
import styled from 'styled-components';

import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

export const LayoutWrapper = styled(motion.div).attrs({
  initial: {y: '-20%', opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: '20%', opacity: 0},
  transition: {duration: 0.2}
})<GeistThemeProps>`
  display: grid;
  grid-template-rows:
    [app-header-start] 3.6rem [app-header-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];
  grid-template-columns:
    [app-column-start] 20rem [app-column-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];

  background-color: ${({$theme}) => $theme.palette.background};
  height: 100%;
  overflow: hidden;
`;

export const LayoutColumn = styled(motion.menu).attrs({
  initial: {x: '-100%'},
  animate: {x: 0},
  exit: {x: '-100%'},
  transition: {duration: 0.2, delay: 0.2}
})<GeistThemeProps>`
  grid-row-start: app-header-start;
  grid-row-end: app-content-end;
  grid-column-start: app-column-start;
  grid-column-end: app-column-end;

  margin: 0; // reset menu component
  background-color: ${({$theme}) => $theme.palette.accents_1};
  border-inline-end: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  overflow: hidden;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};
`;

export const LayoutColumnHeader = styled.header<GeistThemeProps>`
  display: flex;
  justify-content: space-between;
  gap: ${({$theme}) => $theme.layout.gapQuarter};
`;

export const LayoutHeader = styled.header<GeistThemeProps & {$fullWidth?: boolean}>`
  grid-row-start: app-header-start;
  grid-row-end: app-header-end;
  grid-column-start: ${({$fullWidth}) => ($fullWidth ? 'app-column-start' : 'app-content-start')};
  grid-column-end: app-content-end;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({$theme}) => $theme.layout.gapHalf};

  border-block-end: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  overflow: auto;
`;

export const LayoutHeading = styled(Text).attrs({my: 0, h4: true})``;

export const LayoutContent = styled(motion.section).attrs({
  initial: {y: 20, opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: 20, opacity: 0},
  transition: {duration: 0.6}
})<GeistThemeProps & {$fullWidth?: boolean; $noPadding?: boolean}>`
  grid-row-start: app-content-start;
  grid-row-end: app-content-end;
  grid-column-start: ${({$fullWidth}) => ($fullWidth ? 'app-column-start' : 'app-content-start')};
  grid-column-end: app-content-end;

  background-color: ${({$theme}) => $theme.palette.accents_1};
  padding: ${({$theme, $noPadding}) => ($noPadding ? 0 : $theme.layout.gapHalf)};
  height: 100%;
  overflow: auto;
`;
