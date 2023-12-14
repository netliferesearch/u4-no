import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Select, {components} from 'react-select';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';
import { SearchIcon } from '../icons/SearchIcon';
import { ArrowDown } from '../icons/ArrowDown';

const isFilterActive = ( searchFilters = [], filterName ) =>  !!searchFilters.includes( filterName );

export const SearchFilterSearchSelect = ({ id, title, placeholder = 'Select...', aggregationName, filterPrefix }) => {
  const dispatch = useDispatch();
  const searchFilters = useSelector(state => state.searchFilters);
  const defaultBuckets = useSelector(state =>
    sortBy(state.defaultSearchAggs[aggregationName].buckets, ({key}) => key.toLowerCase())
  );
  const options = defaultBuckets.map(({key} = bucket) => ({label: key, value: `${filterPrefix}-${key}`}));

  const selectedValue = options.filter(({value}) => isFilterActive( searchFilters, value ));

  function handleSelect( value, action ) {
    if( action.action === 'select-option') {
      dispatch(addSearchFilter( action.option.value ));
    } else if(( action.action === 'remove-value' ) || ( action.action === 'pop-value' )) {
        dispatch(removeSearchFilter( action.removedValue.value ));
    } else {
      console.log( 'Unhandled action: ', value, action );
    }
  }

  const DropdownIndicator = props => {
    const hasFocus = props.isFocused;

    return (
      <components.DropdownIndicator {...props}>
        {hasFocus ? <SearchIcon /> : <ArrowDown />}
      </components.DropdownIndicator>
    );
  };
  
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">{title}</h3>
      </div>
        <Select 
          id={id}
          options={options} 
          onChange={handleSelect} 
          value={selectedValue}
          placeholder={placeholder}
          aria-label={title}
          isMulti 
          isSearchable={true} 
          isClearable={false}
          className="react-select-container"
          classNamePrefix="react-select"
          components={{
            DropdownIndicator,
            IndicatorSeparator: () => null,
          }}
          />
    </form>
  );
};
