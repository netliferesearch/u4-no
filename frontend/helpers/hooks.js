import { useEffect, useLayoutEffect } from 'react';

export function useLockBodyScroll() {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Get original body overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPadding = window.getComputedStyle(document.body).paddingRight;
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
      // Re-enable scrolling when component unmounts
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPadding;
      };
    }
  }, []); // Empty array ensures effect is only run on mount and unmount
}

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
