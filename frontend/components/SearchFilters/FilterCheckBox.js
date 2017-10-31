import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';

/**
 *  This checkbox is responsible for adding/removing a filter in the redux store.
 *  Furthermore it has no concept of what is filtering be it publication or topic.
 *
 * @param {String}  [id='']             The filterName that is added to redux store.
 * @param {String}  [title='']          The name displayed in the frontend
 * @param {String}  [className='']      Css classes
 * @param {Boolean} [disabled=false]    Is input field disabled?
 * @param {Func}  [addSearchFilter=(] Function called when checkbox is true
 * @param {Func}  [removeSearchFilter=(] Function called when checkbox is false
 * @param {Number}  [numResultsIfFiltered=0] Explain to user how many results they'll see if filter is active
 */
const FilterCheckBox = ({
  id = '',
  title = '',
  className = '',
  disabled = false,
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
    <div className={className}>
      <input onChange={checkBoxHandler} disabled={disabled} type="checkbox" id={id} value={id} />
      <label htmlFor={id} className={`${className}-label`}>
        {title} ({numResultsIfFiltered})
      </label>
    </div>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterCheckBox);
