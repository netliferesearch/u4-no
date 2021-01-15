import React, { useRef, useState } from 'react';
import { TextButton, TextIconButton } from './buttons';
import ClientOnlyPortal from './ClientOnlyPortal';
import languageName from '../../helpers/languageName';
import { useLockBodyScroll, useOnClickOutside } from '../../helpers/hooks';
//import router from 'next/router';
import LinkToItem from '../LinkToItem';

export const Translations = ({ translations, language, route, currentSlug }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextIconButton
        onClick={() => setOpen(true)}
        text={languageName({ langcode: language })}
        modifier="sec"
      />
      {open && (
        <RadioModal
          title="Also available in"
          options={translations}
          setOpen={setOpen}
          route={route}
          currentSlug={currentSlug}
        />
      )}
    </div>
  );
};

export const RadioModal = ({ title = '', options, setOpen, route, currentSlug }) => {
  //const [selectedItem, setSelectedItem] = useState(null);
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  // const handleApplyClick = () => {
  //   setOpen(false);
  //   router.push(`${route}/${selectedItem}`);
  // };

  // const handleChange = e => {
  //   setSelectedItem(options.find(o => o.language === e.target.value).slug);
  // };

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
            {options.map(
                (item = {}, index) =>
                  item.slug &&
                  item.title && (
                    <LinkToItem type="publication" slug={item.slug} key={item._id}>
                      <span>
                        <a className="c-modal__label c-btn c-btn--qua" onClick={() => setOpen(false)}>{languageName({ langcode: item.language })}</a>
                      </span>
                    </LinkToItem>
                  )
              )}
              {/* {options &&
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
                })} */}
            </div>
          </div>
          <div className="c-modal__bottom">
            <div className="c-modal__controls">
              <TextButton onClick={() => setOpen(false)} text="Cancel" modifier="ter" />
              {/* <TextButton onClick={handleApplyClick} text="Confirm" modifier="pri" disabled={!selectedItem}/> */}
            </div>
          </div>
        </form>
      </aside>
    </ClientOnlyPortal>
  );
};
