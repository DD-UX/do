import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import CheckCircle from '@geist-ui/icons/checkCircle';
import ChevronDownCircle from '@geist-ui/icons/chevronDownCircle';
import Circle from '@geist-ui/icons/circle';
import Crosshair from '@geist-ui/icons/crosshair';
import PauseCircle from '@geist-ui/icons/pauseCircle';
import PlayCircle from '@geist-ui/icons/playCircle';
import StopCircle from '@geist-ui/icons/stopCircle';

import {
  STATUS_BACKLOG,
  STATUS_BLOCKED,
  STATUS_CANCELLED,
  STATUS_DONE,
  STATUS_IN_PROGRESS,
  STATUS_IN_REVIEW,
  STATUS_TODO,
  TASK_STATUSES
} from 'features/app/constants/status-constants';

type StatusIconProps<STATUS = (typeof TASK_STATUSES)[number]> = {
  status: STATUS;
  size?: number;
};

const StatusIcon: FC<StatusIconProps> = ({status, size = 18}) => {
  const theme = useTheme();
  switch (status) {
    case STATUS_BACKLOG:
      return <Circle size={size as number} color={theme.palette.accents_5} />;
    case STATUS_TODO:
      return <ChevronDownCircle size={size as number} color={theme.palette.foreground} />;
    case STATUS_IN_PROGRESS:
      return <PlayCircle size={size as number} color={theme.palette.warningLight} />;
    case STATUS_CANCELLED:
      return <StopCircle size={size as number} color={theme.palette.violetLight} />;
    case STATUS_IN_REVIEW:
      return <Crosshair size={size as number} color={theme.palette.cyanLight} />;
    case STATUS_DONE:
      return <CheckCircle size={size as number} color={theme.palette.successLight} />;
    case STATUS_BLOCKED:
      return <PauseCircle size={size as number} color={theme.palette.errorLight} />;
    default:
      return <></>;
  }
};

export default StatusIcon;
