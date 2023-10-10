import {Text} from '@geist-ui/core';
import {Navbar, Sidebar} from 'flowbite-react';
import {motion} from 'framer-motion';
import NextLink from 'next/link';
import styled from 'styled-components';

import {APP_NAVIGATION_SIDEBAR_THEME} from 'features/app/constants/theme-constants';
import {HEADER_HEIGHT, TRANSITION_DURATION} from 'features/app/constants/ui-constants';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

export const LayoutWrapper = styled(motion.div).attrs({
  key: 'layout-wrapper',
  // to be implemented when shallow routing is available in Next.js app folder
  initial: {y: '-20%', opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: '20%', opacity: 0},
  transition: {duration: TRANSITION_DURATION}
})<GeistThemeProps & {withColumn?: boolean}>`
  display: grid;
  grid-template-rows:
    [app-header-start] ${HEADER_HEIGHT} [app-header-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];
  grid-template-columns:
    [app-navigation-start] min-content [app-navigation-end] 0
    [app-column-start] 20rem [app-column-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];

  background-color: ${({$theme}) => $theme.palette.background};
  height: 100%;
  overflow: hidden;
`;

export const LayoutNavigation = styled(Sidebar).attrs({theme: APP_NAVIGATION_SIDEBAR_THEME})`
  grid-row-start: app-header-start;
  grid-row-end: app-content-end;
  grid-column-start: app-navigation-start;
  grid-column-end: app-navigation-end;
`;

export const LayoutColumn = styled.menu<GeistThemeProps>`
  grid-row-start: app-header-start;
  grid-row-end: app-content-end;
  grid-column-start: app-column-start;
  grid-column-end: app-column-end;
  margin: 0; // reset menu component

  display: grid;
  grid-template-rows: ${HEADER_HEIGHT} minmax(0, 1fr) min-content;
  background-color: ${({$theme}) => $theme.palette.accents_1};
  border-inline-end: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  height: 100%;
  overflow: hidden;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};

  & > .btn {
    flex-shrink: 0;
  }
`;

export const LayoutColumnHeader = styled(Navbar)``;

export const LayoutColumnContent = styled.section<GeistThemeProps>`
  flex-grow: 1;
  flex-shrink: 1;

  display: grid;
  grid-template-rows: min-content;
  grid-gap: ${({$theme}) => $theme.layout.gapQuarter};
  padding: ${({$theme}) => $theme.layout.gapQuarter};
  overflow-x: hidden;
  overflow-y: auto;
`;

export const LayoutHeader = styled(Navbar)<{$fullWidth?: boolean}>`
  grid-row-start: app-header-start;
  grid-row-end: app-header-end;
  grid-column-start: ${({$fullWidth}) => ($fullWidth ? 'app-column-start' : 'app-content-start')};
  grid-column-end: app-content-end;
`;

export const LayoutHeading = styled(Text).attrs({my: 0, h4: true})``;

export const LayoutLink = styled(NextLink)<GeistThemeProps>`
  text-decoration: none !important;
  color: ${({$theme}) => $theme.palette.accents_7}!important;

  &:hover {
    color: ${({$theme}) => $theme.palette.accents_8}!important;
  }
`;
