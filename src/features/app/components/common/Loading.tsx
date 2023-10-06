import {FC} from 'react';
import {Spinner} from 'flowbite-react';

type LoadingProps = {
  text?: string;
};

const Loading: FC<LoadingProps> = ({text = 'Loading'}) => {
  return (
    <div className="inline-flex gap-2 align-middle">
      <Spinner aria-label={`${text} spinner`} size="sm" />
      <span>{text}</span>
    </div>
  );
};

export default Loading;
