import React, { useState, useEffect } from 'react';
import { LangFilter } from '../LangFilter';
import { uniq } from 'lodash';
import { Cards } from '../Cards';
import languageName from '../../helpers/languageName';

const applyFliters = (filter, elements) => {
  if (filter) {
    return elements.filter(el => filter === el.language);
  } else {
    return elements;
  }
};

export const CoursesList = ({ blocks = [], cta = 'Register', badge = '' }) => {
  const languages = uniq(
    blocks.length > 0 ? blocks[0].coursesRef.map(course => course.language) : ''
  );
  const [filter, setFilters] = useState('en_US');
  const [currentResults, setCurrentResults] = useState(applyFliters(filter, blocks[0].coursesRef));
  useEffect(
    () => {
      setCurrentResults(applyFliters(filter, blocks[0].coursesRef));
    },
    [filter]
  );
  return (
    <div className="c-courses-list">
      {/* <div className="c-courses-list__content">
        <div className="u-span-btn">
          <span className="u-span-btn__cta">View courses available in:</span>
          {languages.length > 4 ? (
            <LangFilter languages={languages} setFilters={setFilters} currentLang={filter} />
          ) : (
            <form className="c-courses-list__filter">
              {languages &&
                languages.map((language, index) => (
                  <label key={index} className="c-modal__label">
                    <input
                      className="c-modal__input"
                      onChange={e => setFilters(languages.find(l => l === e.target.value))}
                      type="radio"
                      name="language"
                      value={language}
                      checked={language === filter ? true : false}
                    />
                    <span>{languageName({ langcode: language })}</span>
                  </label>
                ))}
            </form>
          )}
        </div>
        <Cards resources={currentResults} cta={cta} badge={badge} />
      </div> */}
    </div>
  );
};

// const mapStateToProps = ({ langFilters = [] }) => ({ langFilters });

// const mapDispatchToProps = dispatch => ({
//   updateLangFilters: bindActionCreators(updateLangFilters, dispatch),
//   clearLangFilters: bindActionCreators(clearLangFilters, dispatch),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CoursesList);
