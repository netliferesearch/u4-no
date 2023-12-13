import React, { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from 'react-redux';
import { updateReadingProgress } from 'helpers/redux-store';

/**
 * Its purpose is to track a number of html titles and see whether or not we have
 * read past those titles.
 *
 * Its only responsibility is to report to redux on scroll updates.
 *
 * Takes article content as input.
 * 
 * Based on old class component CustomScrollSpy
 */

export const TitleProgressSpy = ({ watchables }) => {
  const readingProgressId = useSelector(state => state.readingProgressId);
  const dispatch = useDispatch();
//   const watchables = buildTitleObjects(content).reduce((acc, titleObject) => {
//     // it's important that we add the title before the children to preserve
//     // the chronology
//     acc.push(titleObject);
//     const { children = [] } = titleObject;
//     if (children.length > 0) {
//       acc = acc.concat(children);
//     }
//     return acc;
//   }, []);

// Only highest level titles
  const handleScroll = throttle(() => {
    // loop through all ids to watch and compare the position of the
    // various elements. Elements that are not found will still be
    // present in the list as null
    //
    // going from top to bottom we try to find last id the user has scrolled by
    const { selectedId = false } = watchables.reduce((acc, { id }) => {
      const element = document.getElementById(id);
      if (!element) {
        return acc;
      }
      //take into account fixed header with aprox 130px
      if (window.scrollY > element.offsetTop - element.offsetHeight - 130) {
        acc.selectedId = id;
      }
      return acc;
    }, {});

    if (readingProgressId !== selectedId) {
      dispatch(updateReadingProgress(selectedId));
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div />;
};