import { useEffect } from 'react';
import emptyArr from 'empty/array';
import emptyObj from 'empty/object';
import useThrottle from '@react-hook/throttle';

const useSizeHook = (dim, initialValue, opt) => {
  const {
    fps,
    leading
  } = opt;
  const [size, setThrottledSize] = useThrottle(typeof document === 'undefined' ? initialValue : document.documentElement[dim], fps, leading);

  function _ref() {
    return setThrottledSize(document.documentElement[dim]);
  }

  useEffect(() => {
    const setSize = _ref;
    window.addEventListener('resize', setSize);
    window.addEventListener('orientationchange', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('orientationchange', setSize);
    };
  }, emptyArr);
  return size;
};

export const useWindowHeight = (initialValue = 0, opt = emptyObj) => {
  return useSizeHook('clientHeight', initialValue, opt);
};
export const useWindowWidth = (initialValue = 0, opt = emptyObj) => {
  return useSizeHook('clientWidth', initialValue, opt);
};
export const useWindowSize = (initialWidth, initialHeight, opt) => [useWindowWidth(initialWidth, opt), useWindowHeight(initialHeight, opt)];
export default useWindowSize;
