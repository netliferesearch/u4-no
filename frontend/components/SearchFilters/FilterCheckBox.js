import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';

/**
 *  This checkbox is responsible for adding/removing a filter in the redux store.
 *  Furthermore it has no concept of what is filtering be it publication or topic.
 *
 * @param {String}  [id='']             [description]
 * @param {String}  [title='']          [description]
 * @param {String}  [className='']      [description]
 * @param {Boolean} [disabled=false]    [description]
 * @param {Array}   [results=[]]        [description]
 * @param {[type]}  [addSearchFilter=(] [description]
 */
const FilterCheckBox = ({
  id = '',
  title = '',
  className = '',
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
