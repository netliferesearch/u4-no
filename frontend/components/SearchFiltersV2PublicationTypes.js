import React from 'react';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import slugify from 'slugify';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';

const PublicationTypes = (props) => {
  const { publicationTypes = {}, onChangeHandler } = props;
  const { buckets = [] } = publicationTypes;
  // eslint-disable-next-line
  // debugger;
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
      </div>
      <span>
        {buckets.map(({ key, doc_count }) => (
          <div key={slugify(key)} className="c-input">
            <input
              type="checkbox"
              id={slugify(key)}
              value={key}
              onChange={event => onChangeHandler({ event, filterType: 'publicationType' })}
            />
            <label htmlFor={slugify(key)}>
              {key} ({doc_count})
            </label>
          </div>
        ))}
      </span>
    </form>
  );
};

export default PublicationTypes;
