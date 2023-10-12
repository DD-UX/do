import NextLink from 'next/link';
import styled from 'styled-components';

import {GeistThemeProps} from 'lib/geist/geist-theme-models';

export const LayoutLink = styled(NextLink)<GeistThemeProps>`
  text-decoration: none !important;
  color: ${({$theme}) => $theme.palette.accents_7}!important;

  &:hover {
    color: ${({$theme}) => $theme.palette.accents_8}!important;
  }
`;
