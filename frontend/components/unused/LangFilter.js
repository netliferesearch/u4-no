import React, { useRef, useState } from 'react';
import ClientOnlyPortal from '../general/ClientOnlyPortal';
import { useOnClickOutside, useLockBodyScroll } from '../../helpers/hooks';
import languageName from '../../helpers/languageName';
import { TextButton, TextIconButton } from '../general/buttons';

/**
 * V2 - LangFilter component to be used in CoursesList component
 * @param {Array} languages
 * @param {function} setFilter
 * @param {String} currentLang
 */

 export const LangFilter = ({ languages, setFilters, currentLang = 'en_US' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextIconButton
        onClick={() => setOpen(true)}
        text={languageName({ langcode: currentLang })}
        modifier="sec"
      />
      {open && (
        <RadioModal
          title="Select language"
          options={languages}
          checkedItem={currentLang}
          setOpen={setOpen}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};


export const RadioModal = ({ title = '', options, checkedItem = '', setOpen, setFilters }) => {
    const [selectedItem, setSelectedItem] = useState(checkedItem);
    // ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    //hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setOpen(false));
    //hook to lock body scroll
    useLockBodyScroll();

    const handleApplyClick = () => {
      setOpen(false);
      setFilters(selectedItem)
    };

    const handleChange = e => {
      setSelectedItem(options.find(o => o === e.target.value));
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
          <form className="c-modal__area c-modal--translations" ref={ref}>
            <div className="c-modal__top">
              <h3 className="c-modal__title">{title}</h3>
            </div>
            <hr className="u-section-underline--no-margins" />
            <div className="c-modal__content">
              <div className="c-modal__list">
                {options &&
                  options.map((option, index) =>  (
                      <label key={index} className="c-modal__label">
                        <input
                          className="c-modal__input"
                          onChange={e => handleChange(e)}
                          type="radio"
                          name="language"
                          value={option}
                          checked={option === selectedItem ? true : false}
                        />
                        <span>{languageName({ langcode: option })}</span>
                      </label>
                    )
                  )}
              </div>
            </div>
            <div className="c-modal__bottom">
              <div className="c-modal__controls">
                <TextButton onClick={() => setOpen(false)} text="Cancel" modifier="ter" />
                <TextButton onClick={handleApplyClick} text="Confirm" modifier="pri" disabled={!selectedItem}/>
              </div>
            </div>
          </form>
        </aside>
      </ClientOnlyPortal>
    );
  };
