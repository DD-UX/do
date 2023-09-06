import {useMemo, useState} from 'react';
import {useShallow} from 'use-shallow';

type UseRouterShallowValues = {
  query: URLSearchParams;
  push: (url: string) => void;
};

/*
 * This Hook will create a shallow routing and force client side app to refresh states without reloading the entire layout
 * Comment: hope Next.js supports this natively soon
 */
function useRouterShallow(): UseRouterShallowValues {
  const [query, push] = useShallow();
  const [, setForceRefresh] = useState(0);

  const pushWithForceRefresh = async (url: string) => {
    await push(url);
    setTimeout(() => {
      setForceRefresh((prevState) => prevState + 1);
    }, 100);
  };

  const memoizedReturnValue: UseRouterShallowValues = useMemo(() => {
    return {
      query,
      push: pushWithForceRefresh
    };
  }, [query]);

  return memoizedReturnValue;
}

export default useRouterShallow;
