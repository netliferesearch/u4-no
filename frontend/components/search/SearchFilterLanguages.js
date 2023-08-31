import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replaceSearchFilters } from '../../helpers/redux-store';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';

const getLanguage = ({ searchFilters = [] }) => {
  const languageFilter = searchFilters.find(name => name.startsWith('lang-type'));
  if (!languageFilter) {
    return ''; // no active language filter
  }
  const language = /lang-type-(.*)/gi.exec(languageFilter)[1];
  return language;
};
export const SearchFilterLanguages = () => {
  const dispatch = useDispatch();
  const defaultBuckets = useSelector(state =>
    sortBy(state.defaultSearchAggs.languages.buckets, ['key'])
  );
  const searchFilters = useSelector(state => state.searchFilters);
  const [langExpanded, setLangExpanded] = useState('');
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Language</h3>
      </div>
      <span>
        <div className="c-filters-v2__select">
          <select
            onClick={e => {
              e.preventDefault();
              setLangExpanded(prevIsExpanded => !prevIsExpanded);
            }}
            onBlur={e => {
              e.preventDefault();
              setLangExpanded(false);
            }}
            id="lang"
            className={`c-select ${langExpanded && 'expanded'}`}
            onChange={event => {
              const value = event.target.value;
              const newFilters = [...searchFilters.filter(name => !name.startsWith('lang-type'))];
              if (!value) {
                return dispatch(replaceSearchFilters(newFilters));
              }
              newFilters.push(`lang-type-${value}`);
              dispatch(replaceSearchFilters(newFilters));
            }}
            value={getLanguage({ searchFilters })}
          >
            <option key="any" value="">All languages</option>
            {defaultBuckets.map(bucket => {
              const { key } = bucket;
              return (
                <option className="c-select__option" key={slugify(key)} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
      </span>
    </form>
  );
};
