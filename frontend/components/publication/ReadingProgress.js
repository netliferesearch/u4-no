import React, { useState } from 'react';
import { useScrollInfo } from '../../helpers/useScrollInfo';

export const ReadingProgress = ({ targetRef }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useScrollInfo(
    ({ currPos }) => {
      if (!targetRef.current) {
        return;
      }
      const element = targetRef.current;
      const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight;
      const windowScrollTop =
        -currPos.y || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (windowScrollTop === 0) {
        return setReadingProgress(0);
      }

      if (windowScrollTop > totalHeight) {
        return setReadingProgress(100);
      }

      setReadingProgress((windowScrollTop / totalHeight) * 100);
    },
    [readingProgress],
    targetRef,
    false,
    0
  );

  return (
    <div className={`c-progress-bar__container`}>
      <div className={`c-progress-bar`} style={{ width: `${readingProgress}%` }} />
    </div>
  );
};
