import {FC} from 'react';

import {TASK_STATUSES} from 'features/app/constants/status-constants';

type StatusSelectorProps<STATUS = (typeof TASK_STATUSES)[number]> = {
  status: STATUS;
  onChange: (updatedStatus: STATUS) => void;
};

const StatusSelector: FC<StatusSelectorProps> = ({status, onChange}) => {
  return <></>;
};

export default StatusSelector;
