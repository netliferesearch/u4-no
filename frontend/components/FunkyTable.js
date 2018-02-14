import React from 'react';
import PropTypes from 'prop-types';

const FunkyTable = ({ rows = [], title = '' }) => (<div className="c-longform-grid__standard">
  <div className="c-table-container">
    {title && <h2 className="c-table-container__heading">{title}</h2>}
    <table className="c-table">
      <tbody className="c-table__body">
        {
          rows.map((row, index) => (
            <tr key={index} className="c-table__row">
              { row.columns.map((col, index) => (
                <td key={index} className="c-table__cell">{col}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
</div>);

FunkyTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string),
    })),
  })).isRequired,
  title: PropTypes.string,
}

FunkyTable.defaultProps = {
  title: '',
};

export default FunkyTable;
