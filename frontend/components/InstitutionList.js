import React from 'react';
import PropTypes from 'prop-types';

const InstitutionList = ({ institutions = [] }) => (
  <p className="c-article-header__institution">
    {institutions &&
      institutions
        .filter(inst => inst)
        .map(inst => (inst.target ? inst.target : inst))
        .map(({ _id, description = '', institution = {} }, index) => (
          <span key={_id + index}>
            {description}
            {institution && institution.name ? ` ${institution.name}` : ''}
          </span>
        ))}
  </p>
);

InstitutionList.propTypes = {
  institutions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InstitutionList;
