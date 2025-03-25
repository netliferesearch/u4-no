import slugify from 'slugify';
import { ShowMoreItems } from '../course/ShowMoreItems';

export const FilterCheckboxes = props => {
  const {
    id = '',
    title = '',
    placeholder = '',
    filters = {},
    filterValues = [],
    filterName = '',
    onChange = () => {},
  } = props;

  const currentValue = filters[filterName] || new Set();

  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">{title}</h3>
      </div>
      <span>
        <ShowMoreItems items={filterValues}>
          {({ slicedItems }) =>
            slicedItems.map(item => {
              const filterKey = `${filterName}-${slugify(item)}`;
              return (
                <div key={filterKey} className="c-input">
                  <input
                    type="checkbox"
                    id={filterKey}
                    value={filterKey}
                    checked={currentValue.has(item)}
                    onChange={event => onChange(filterName, item)}
                  />
                  <label htmlFor={filterKey}>{item}</label>
                </div>
              );
            })
          }
        </ShowMoreItems>
      </span>
    </form>
  );
};
