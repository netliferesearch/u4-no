"use client";

import { useEffect, useState } from 'react';

export const useOnScreen = (refCurrent, rootElement) => {
  const [isIntersecting, setIntersecting] = useState(undefined);

  let options = {
    root: rootElement,
    // rootMargin: '0px',
    // threshold: 1.0
  }

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if ( typeof window !== 'undefined' ) {
      setIsClient(true);
    }
  }, []);

  const observer = isClient && new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

  useEffect(() => {
    if (refCurrent && observer) {
      observer.observe(refCurrent);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect();
      };
    }
  }, [refCurrent]);

  return isIntersecting;
};
