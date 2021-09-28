import React, { useState, useRef, useEffect } from 'react';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import { Scrollchor } from 'react-scrollchor';
import { useDispatch, useSelector } from 'react-redux';
import { updateReadingProgress } from '../../helpers/redux-store';
import { ToTop } from '../icons/ToTop';
import { useOnClickOutside } from '../../helpers/hooks';

/**
 * V2 - Contents components to be used in Reader component
 */

export const ContentsMobile = ({ title = '', content = [] }) => {
  const [activeItem, setActiveItem] = useState();
  const titleObjects = buildTitleObjects(content);
  const readingProgressId = useSelector(state => state.readingProgressId);
  const dispatch = useDispatch();
  const onItemSelected = e => {
    const hash = e.target.hash.substring(1);
    dispatch(updateReadingProgress(hash));
  };

  useEffect(
    () => {
      if (activeItem !== readingProgressId) {
        setActiveItem(readingProgressId);
      }
    },
    [readingProgressId]
  );

  return (
    <div className="c-contents c-contents--mobile">
      <ul className="c-contents__list">
        {titleObjects.length
          ? titleObjects.map((titleObject, index) => {
              const { title, id, children = [] } = titleObject;
              return (
                <li
                  key={id}
                  className={`c-contents__list-item--mobile u-text--grey ${
                    activeItem === id ? 'c-contents__list-item--active' : ''
                  }`}
                >
                  <p className="c-contents__subtitle u-secondary-heading u-secondary-h3">
                    <Scrollchor
                      to={`#${id}`}
                      animate={{ offset: -120 }}
                      beforeAnimate={onItemSelected}
                      disableHistory
                    >
                      Section {index + 1}
                    </Scrollchor>
                  </p>
                  {index < titleObjects.length - 1 && <hr className="u-section-underline--grey" />}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
