import React, { useState } from 'react';

export const Translations = ({ translations, language }) => {
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [value, setValue] = useState(language ? language : '');
  //e => updateSearchSorting(e.target.value)
  //set select value on change
  return (
    <div className="c-blog__translations">
      <div className={`dropdown-select${downloadsOpen ? ' open' : ''}`}>
        <select value={value} onChange={e => setValue(e.target.value)} classname="c-btn c-btn--select">
          {/* <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option> */}
          {translations.map(
            (item = {}, index) =>
              item.slug &&
              item.title && (
                <option key={item._id} value={languageName({ langcode: item.language })}>
                  <LinkToItem type="blog" slug={item.slug}>
                    <span>
                      <a {...classes('language')}>{languageName({ langcode: item.language })}</a>
                      {index + 2 < translations.length && <span>, </span>}
                      {index + 2 === translations.length && <span> and </span>}
                    </span>
                  </LinkToItem>
                </option>
              )
          )}
        </select>
      </div>
    </div>
  );
};
