import React, { useRef, useState } from 'react';
import ClientOnlyPortal from '../ClientOnlyPortal';
import { CloseButton, TextButton } from '../buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../../helpers/hooks';

/**
 * V2 - Blog filter component to be used in BlogPage component
 * @param {Array} topics
 * @param {function} setFilter
 * @param {Array} filters
 */

export const BlogEntriesFilter = ({ topics, setFilters, filters, updateBlogPageNum }) => {
  const [open, setOpen] = useState();
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton onClick={() => setOpen(true)} text="Filter by topic" modifier="sec" />
      {open && (
        <MultiselectModal
          title="Filter by topic"
          options={topics}
          setOpen={setOpen}
          setFilters={setFilters}
          filters={filters}
          updateBlogPageNum={updateBlogPageNum}
        />
      )}
    </div>
  );
};

export const MultiselectModal = props => {
  const { title = '', options, setOpen, setFilters, filters, updateBlogPageNum } = props;
  const [selectedItems, setSelectedItems] = useState(filters);
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  const handleApplyClick = () => {
    setFilters(selectedItems);
    updateBlogPageNum(1);
    setOpen(false);
  };

  const handleChange = (e, item) => {
    const currentItems = [...selectedItems];
    if (e.target.checked) {
      currentItems.push(item);
    } else {
      currentItems.splice(currentItems.indexOf(item), 1);
    }
    setSelectedItems(currentItems);
  };

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  };

  return (
    <ClientOnlyPortal selector="#modal">
      <aside
        className="c-modal__cover"
        aria-modal="true"
        tabIndex="-1"
        role="dialog"
        onKeyDown={onKeyDown}
      >
        <div className="c-modal__area c-modal--filters" ref={ref}>
          <div className="c-modal__top">
            <h3 className="c-modal__title">{title}</h3>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className="c-modal__content">
            <div className="c-modal__list">
              {options &&
                options.map((option, index) => {
                  return (
                    <label key={index} className="c-modal__label">
                      <input
                        className="c-modal__input"
                        onChange={e => handleChange(e, option)}
                        type="checkbox"
                        checked={selectedItems.some(filter => filter.title === option.title)}
                        name={option.title}
                      />
                      <span className="custom-checkbox" />
                      <span>{option.title}</span>
                    </label>
                  );
                })}
            </div>
          </div>
          <div className="c-modal__bottom">
            <hr className="u-section-underline--no-margins" />
            <div className="c-modal__controls">
              <TextButton onClick={e => setSelectedItems([])} text="Deselect All" modifier="qua" />
              <TextButton onClick={handleApplyClick} text="Apply" modifier="pri" />
            </div>
          </div>
        </div>
      </aside>
    </ClientOnlyPortal>
  );
};