import { useEffect, useRef } from 'react';

function useEffectOnUpdate(callback, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return callback();
  }, dependencies);
}

export default useEffectOnUpdate;