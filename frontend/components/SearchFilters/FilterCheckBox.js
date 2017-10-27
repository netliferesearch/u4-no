import slugify from 'slugify';
import { findPublications } from './filterHelpers';

const FilterCheckBox = ({
  publicationType,
  disabled = false,
  results = [],
  addSearchFilter = () => {},
  removeSearchFilter = () => {},
}) => {
  const numResultsIfFiltered = findPublications(results).filter(
    resPub => resPub.publicationType._id === publicationType._id,
  ).length;
  const slugifiedName = slugify(publicationType.title, { lower: true });
  const checkBoxHandler = (e) => {
    const { checked } = e.target;
    if (checked) {
      addSearchFilter(slugifiedName);
    } else {
      removeSearchFilter(slugifiedName);
    }
  };
  return (
    <div>
      <input
        onChange={checkBoxHandler}
        disabled={disabled}
        type="checkbox"
        id={slugifiedName}
        value={slugifiedName}
      />
      <label htmlFor={slugifiedName}>
        {publicationType.title} ({numResultsIfFiltered})
      </label>
    </div>
  );
};

export default FilterCheckBox;
