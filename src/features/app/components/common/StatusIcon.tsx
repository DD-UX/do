import {FC} from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDownCircle,
  AiOutlinePauseCircle,
  AiOutlinePlayCircle
} from 'react-icons/ai';
import {PiCrosshairSimpleLight} from 'react-icons/pi';
import {TbCircleDotted} from 'react-icons/tb';

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

type StatusIconProps<STATUS = (typeof TASK_STATUSES)[number] | string> = {
  status: STATUS;
  size?: number;
};

const StatusIcon: FC<StatusIconProps> = ({status, size = 18}) => {
  switch (status) {
    case STATUS_BACKLOG:
      return <TbCircleDotted size={size as number} className="text-gray-300" />;
    case STATUS_TODO:
      return <AiOutlineDownCircle size={size as number} className="text-white" />;
    case STATUS_IN_PROGRESS:
      return <AiOutlinePlayCircle size={size as number} className="text-orange-300" />;
    case STATUS_CANCELLED:
      return <AiOutlineCloseCircle size={size as number} className="text-purple-300" />;
    case STATUS_IN_REVIEW:
      return <PiCrosshairSimpleLight size={size as number} className="text-cyan-200" />;
    case STATUS_DONE:
      return <AiOutlineCheckCircle size={size as number} className="text-green-400" />;
    case STATUS_BLOCKED:
      return <AiOutlinePauseCircle size={size as number} className="text-red-400" />;
    default:
      return <></>;
  }
};

export default StatusIcon;
