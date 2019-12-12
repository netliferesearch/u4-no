import React, { useState, useEffect } from 'react';

const useMediaQuery = query => {
  const [match, setMatch] = useState(false);
  const queries = {
    mobile: '(min-width: 320px)',
    tablet: '(min-width: 740px)',
    desktop: '(min-width: 1100px)',
    wide: '(min-width: 1300px)',
  };
  useEffect(
    () => {
      const updateMatch = () => setMatch(window.matchMedia(queries[query]).matches);

      updateMatch();
      window.matchMedia(queries[query]).addEventListener('change', updateMatch);
      return () => {
        window.matchMedia(queries[query]).removeEventListener('change', updateMatch);
      };
    },
    [query]
  );

  return match;
};

export default useMediaQuery;
