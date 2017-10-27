const FilterCheckBox = ({
  id = '',
  title = '',
  disabled = false,
  results = [],
  addSearchFilter = () => {},
  removeSearchFilter = () => {},
  numResultsIfFiltered = 0,
}) => {
  const checkBoxHandler = (e) => {
    const { checked } = e.target;
    if (checked) {
      addSearchFilter(id);
    } else {
      removeSearchFilter(id);
    }
  };
  return (
    <div>
      <input onChange={checkBoxHandler} disabled={disabled} type="checkbox" id={id} value={id} />
      <label htmlFor={id}>
        {title} ({numResultsIfFiltered})
      </label>
    </div>
  );
};

export default FilterCheckBox;
