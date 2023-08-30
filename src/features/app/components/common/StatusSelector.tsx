import {FC, useState} from 'react';
import {Button, ButtonGroup, useTheme} from '@geist-ui/core';
import styled from 'styled-components';

import StatusIcon from 'features/app/components/common/StatusIcon';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';

const StatusSelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
  line-height: 1;
`;
const StatusSelectorMenu = styled.menu<GeistThemeProps>`
  position: absolute;
  left: ${({$theme}) => `calc((${$theme.layout.gapHalf} + ${$theme.layout.gapQuarter}) * -1)`};
  top: ${({$theme}) => `calc(100% + ${$theme.layout.gapQuarter})`};
  z-index: ${Z_INDEX.dropdown};
`;

type StatusSelectorProps = {
  status: (typeof TASK_STATUSES)[number];
  onChange: (updatedStatus: (typeof TASK_STATUSES)[number]) => void;
};

const StatusSelector: FC<StatusSelectorProps> = ({status, onChange}) => {
  const theme = useTheme();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStatusChange = (updatedStatus: (typeof TASK_STATUSES)[number]) => {
    setCurrentStatus(updatedStatus);
    onChange(updatedStatus);
  };

  return (
    <StatusSelectorWrapper onClick={() => setIsMenuOpen((prevState) => !prevState)}>
      <StatusIcon status={currentStatus} />
      {isMenuOpen && (
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
