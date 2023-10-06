import {FC} from 'react';
import {Dropdown} from 'flowbite-react';
import {tv} from 'tailwind-variants';

import StatusIcon from 'features/app/components/common/StatusIcon';
import {TASK_STATUSES} from 'features/app/constants/status-constants';

const statusSelectorItem = tv({
  base: ['grid', 'grid-auto-col ', 'gap-1', ' grid-cols-[2rem_1fr] ', 'cursor-pointer']
});

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
  const handleStatusChange = (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    onChange(updatedStatus);
  };

  return (
    <Dropdown
      label="Dropdown"
      inline
      renderTrigger={() => (
        <div className={statusSelectorItem()}>
          <StatusIcon size={iconSize as number} status={status} />
          {showValue && <p className="m-0">{status}</p>}
        </div>
      )}
    >
      <Dropdown.Header>Select a status</Dropdown.Header>
      {TASK_STATUSES?.map((currentStatus) => (
        <Dropdown.Item
          key={currentStatus}
          value={currentStatus}
          onClick={() => handleStatusChange(currentStatus)}
        >
          <div className={statusSelectorItem()}>
            <StatusIcon size={iconSize as number} status={currentStatus} />
            <p className="m-0">{currentStatus}</p>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default StatusSelector;
