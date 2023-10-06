import {FC} from 'react';
import {BiError} from 'react-icons/bi';
import {HiFire} from 'react-icons/hi';

import {FAILURE_TYPE, SUCCESS_TYPE, TOAST_TYPES} from 'features/app/constants/toast-constants';

type ToastIconProps<TYPE = (typeof TOAST_TYPES)[number]> = {
  type: TYPE | undefined;
};

const ToastIcon: FC<ToastIconProps> = ({type}) => {
  switch (type) {
    case SUCCESS_TYPE:
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <HiFire className="h-5 w-5" />
        </div>
      );
    case FAILURE_TYPE:
      return (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <BiError className="h-5 w-5" />
        </div>
      );
    default:
      return <></>;
  }
};

export default ToastIcon;
