import {FC, useRef, useState} from 'react';
import {
  Button,
  ButtonGroup,
  KeyCode,
  Text,
  useClickAway,
  useKeyboard,
  useTheme
} from '@geist-ui/core';
import styled from 'styled-components';

import StatusIcon from 'features/app/components/common/StatusIcon';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

const StatusSelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
`;
const StatusSelectorLabel = styled.div<GeistThemeProps>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: repeat('auto-fit', min-content);
  grid-gap: ${({$theme}) => $theme.layout.gapQuarter};
  align-items: center;
`;

const StatusSelectorMenu = styled.menu<GeistThemeProps>`
  position: absolute;
  left: ${({$theme}) => `calc((${$theme.layout.gapHalf} + ${$theme.layout.gapQuarter}) * -1)`};
  top: ${({$theme}) => `calc(100% + ${$theme.layout.gapQuarter})`};
  z-index: ${Z_INDEX.dropdown};
`;

type StatusSelectorProps = {
  status: (typeof TASK_STATUSES)[number] | string;
  iconSize?: number;
  showValue?: boolean;
  onChange: (updatedStatus: (typeof TASK_STATUSES)[number] | string) => void;
};

const StatusSelector: FC<StatusSelectorProps> = ({
  status,
  iconSize = 18,
  showValue = false,
  onChange
}) => {
  const theme = useTheme();
  const menuElementRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useClickAway(menuElementRef, () => {
    setMenuVisible(false);
  });

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible(false);
  }, [KeyCode.Escape]);

  const handleStatusChange = (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    onChange(updatedStatus);
  };

  return (
    <StatusSelectorWrapper
      ref={menuElementRef}
      onClick={() => setMenuVisible((prevState) => !prevState)}
    >
      <StatusSelectorLabel $theme={theme}>
        <StatusIcon size={iconSize as number} status={status} />
        {showValue && (
          <Text my={0} style={{textTransform: 'capitalize'}}>
            {status}
          </Text>
        )}
      </StatusSelectorLabel>
      {menuVisible && (
        <StatusSelectorMenu $theme={theme}>
          <ButtonGroup vertical>
            {TASK_STATUSES.map((status) => (
              <Button
                key={status}
                icon={<StatusIcon status={status} />}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </Button>
            ))}
          </ButtonGroup>
        </StatusSelectorMenu>
      )}
    </StatusSelectorWrapper>
  );
};

export default StatusSelector;
