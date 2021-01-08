import React, { useRef, useState } from 'react';
import { TextButton } from './buttons';
import ClientOnlyPortal from './ClientOnlyPortal';
import languageName from '../../helpers/languageName';
import { useLockBodyScroll, useOnClickOutside } from '../../helpers/hooks';
import router from 'next/router';

export const Translations = ({ translations, language, currentSlug }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton
        onClick={() => setOpen(true)}
        text={languageName({ langcode: language })}
        modifier="sec"
      />
      {open && (
        <RadioModal
          title="Language settings"
          options={translations}
          setOpen={setOpen}
          currentSlug={currentSlug}
        />
      )}
    </div>
  );
};

export const RadioModal = ({ title = '', options, setOpen, currentSlug }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  const handleApplyClick = () => {
    setOpen(false);
    router.push(`/blog/${selectedItem}`);  
  };

  const handleChange = e => {
    setSelectedItem(options.find(o => o.language === e.target.value).slug);
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
                options.map((option, index) => {
                  return (
                    <label key={index} className="c-modal__label">
                      <input
                        className="c-modal__input"
                        onChange={e => handleChange(e)}
                        type="radio"
                        name="language"
                        value={option.language}
                      />
                      <span>{languageName({ langcode: option.language })}</span>
                    </label>
                  );
                })}
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
