import {motion} from 'framer-motion';
import styled from 'styled-components';

import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

export const DetailForm = styled.form`
  display: grid;
  grid-template-rows:
    [project-header-start] 3.6rem [project-header-end] 0
    [project-content-start] minmax(0, 1fr) [project-content-end];
  grid-template-columns:
    [project-content-start] minmax(0, 1fr) [project-content-end] 0
    [project-column-start] 20rem [project-column-end];

  height: 100%;
`;

export const DetailContent = styled(motion.section).attrs({
  key: 'detail-content',
  // to be implemented when shallow routing is available in Next.js app folder
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0},
  transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: project-header-start;
  grid-row-end: project-content-end;
  grid-column-start: project-content-start;
  grid-column-end: project-content-end;

  display: flex;
  flex-direction: column;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  width: 80%;
  max-width: 100rem;
  justify-self: center;
  overflow: auto;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};
`;

export const DetailMenu = styled(motion.menu).attrs({
  key: 'detail-menu',
  // to be implemented when shallow routing is available in Next.js app folder
  initial: {x: '100%'},
  animate: {x: 0},
  exit: {x: '100%'},
  transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: project-header-start;
  grid-row-end: project-content-end;
  grid-column-start: project-column-start;
  grid-column-end: project-column-end;

  display: flex;
  flex-direction: column;
  gap: ${({$theme}) => $theme.layout.gapHalf};

  margin: 0; // reset menu component
  background-color: ${({$theme}) => $theme.palette.accents_2};
  border-inline-end: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  overflow: hidden;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};

  & > .btn {
    flex-shrink: 0;
  }
`;

export const DetailMenuContent = styled.div<GeistThemeProps>`
  display: flex;
  flex-direction: column;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  overflow: auto;
`;
