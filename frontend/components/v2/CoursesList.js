import React, { useState, useEffect } from 'react';
import { LangFilter } from './LangFilter';
import { uniq } from 'lodash';
import { Cards } from './Cards';

const applyFliters = (filter, elements) => {
  if (filter) {
    return elements.filter(el => filter === el.language);
  } else {
    return elements;
  }
};

export const CoursesList = ({ blocks = [], cta = 'Register' }) => {
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
      <div className="u-span-btn">
        <span>View courses available in:</span>
        <LangFilter languages={languages} setFilters={setFilters} currentLang={filter} />
      </div>
      {/* <TextButton onClick={handleRemove} text="Remove all" modifier="ter" /> */}
      <Cards resources={currentResults} cta={cta} />
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
