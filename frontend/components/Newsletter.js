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
    const { smallTitle = 'Keep up with us', title = 'Subscribe to our newsletter', link = '/#' } = this.props;

    return (
      <div>
        <div {...classes(null, null)}>
          <div {...classes('content')}>
            <h4 {...classes('small-title')}>{smallTitle}</h4>
            <Link to={link}>
              <a>
                <h3 {...classes('title')}>
                  {title}
                  <span {...classes('title-arrow')}>
                    <ArrowRight />
                  </span>
                </h3>
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
