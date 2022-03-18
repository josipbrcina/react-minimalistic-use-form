import { useEffect, useState } from 'react';

export const useIsUpdated = (method: (...args: unknown[]) => unknown, props: Array<unknown>): void => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (hasRun) {
      method();
    } else {
      setHasRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, props);
};
