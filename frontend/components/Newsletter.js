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

  scrollToTop(e) {
    window.scrollTo(0, 0);
  }

  render() {
    const { smallTitle = 'Keep up with us', title = 'Subscribe to our newsletter', link = 'http://u4.nationbuilder.com/' } = this.props;

    return (
      <div>
        <div {...classes(null, null)}>
          <div {...classes('content')}>
            <h4 {...classes('small-title')}>{smallTitle}</h4>
            <Link to={'http://u4.nationbuilder.com/'}>
              <a {...classes('title-wrapper')}>
                <h3 {...classes('title')}>
                  {title}
                </h3>
                <span {...classes('title-arrow')}>
                  <ArrowRight />
                </span>
              </a>
            </Link>
          </div>
          <div {...classes('to-top')}>

            <a onClick={this.scrollToTop}>
              <ArrowRight {...classes('to-top-arrow')} />
              Back to top
            </a>

          </div>
        </div>
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
