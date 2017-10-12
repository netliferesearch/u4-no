import React, { Component } from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';

const classes = BEMHelper({
  name: 'newsletter',
  prefix: 'c-',
});

class Newsletter extends Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit(e) {

  }

  render() {
    const { label, placeholder, link } = this.props;

    return (
      <div {...classes()}>
        <form {...classes(null, null, 'o-wrapper')}>
          <label htmlFor="email">{label}</label>
          <input type="email" placeholder={placeholder} value="" />
          <button type="submit"><ArrowRight /></button>
        </form>
        <span>Back top top</span>
      </div>
    );
  }
}

Newsletter.defaultProps = {
  label: 'Keep up with us',
  placeholder: 'Subscribe to our newsletter',
  link: '#',
};


export default Newsletter;
