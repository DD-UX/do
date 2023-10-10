import {FC, PropsWithChildren} from 'react';
import {motion} from 'framer-motion';
import styled from 'styled-components';

const LayoutContentWrapper = styled(motion.section).attrs({
  key: 'layout-content'
  // to be implemented when shallow routing is available in Next.js app folder
  // initial: {y: 20, opacity: 0},
  // animate: {y: 0, opacity: 1},
  // exit: {y: 20, opacity: 0},
  // transition: {duration: 0.6}
})<{$fullWidth?: boolean}>`
  grid-row-start: app-content-start;
  grid-row-end: app-content-end;
  grid-column-start: ${({$fullWidth}) => ($fullWidth ? 'app-column-start' : 'app-content-start')};
  grid-column-end: app-content-end;
`;

type LayoutContentProps = {
  fullWidth?: boolean;
  noPadding?: boolean;
};

const LayoutContent: FC<PropsWithChildren<LayoutContentProps>> = ({
  fullWidth = false,
  noPadding = true,
  children
}) => {
  return (
    <LayoutContentWrapper
      className={`bg-white dark:bg-gray-700 h-full overflow-y-auto ${noPadding ? '' : 'px-4'}`}
      $fullWidth={!!fullWidth}
    >
      {children}
    </LayoutContentWrapper>
  );
};

export default LayoutContent;
