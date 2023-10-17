import {FC} from 'react';
import {HiExternalLink} from 'react-icons/hi';
import {Button, Toast} from 'flowbite-react';

import ToastIcon from 'features/app/components/common/ToastIcon';
import {TOAST_TYPES} from 'features/app/constants/toast-constants';

export type FloatingToastProps = {
  text: string;
  link?: string | undefined;
  type?: (typeof TOAST_TYPES)[number];
  onDismiss(): void;
};

const FloatingToast: FC<FloatingToastProps> = ({text, type, link, onDismiss}) => {
  return (
    <Toast className="fixed bottom-2 right-2 z-[9999] transition-all">
      <ToastIcon type={type} />
      <div className="ml-3 text-sm font-normal">{text}</div>
      <div className="ml-auto flex items-center space-x-2">
        {link && (
          <Button as="a" size="xs" color="light" outline href={link} target="_blank">
            <HiExternalLink />
            Open
          </Button>
        )}
        <Toast.Toggle onDismiss={onDismiss} />
      </div>
    </Toast>
  );
};

export default FloatingToast;
