import { useEffect, useState } from 'react';

export const useOnScreen = (refCurrent, rootElement) => {
  const [isIntersecting, setIntersecting] = useState(undefined);

  let options = {
    root: rootElement,
    // rootMargin: '0px',
    // threshold: 1.0
  }

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

  useEffect(() => {
    if (refCurrent) {
      observer.observe(refCurrent);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect();
      };
    }
  }, [refCurrent]);

  return isIntersecting;
};
