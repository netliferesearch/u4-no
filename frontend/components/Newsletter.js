import Link from 'next/link';
import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import ArrowRight from '../components/icons/ArrowRight';

const classes = BEMHelper({
  name: 'newsletter',
  prefix: 'c-',
});

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const mailchimpUrl =
      'https://cmi.us16.list-manage.com/subscribe?u=e5ddae636e7550347b5fc48d3&id=387c25c3a9';
    document.location.href = `${mailchimpUrl}&MERGE0=${e.target.email.value}`;
  }

  scrollToTop(e) {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      smallTitle = 'Subscribe to our newsletter:',
      title = 'Your e-mail address',
      link = 'http://eepurl.com/dtV9Df',
    } = this.props;

    return (
      <div>
        <div {...classes(null, null)}>
          <div {...classes('content')}>
            <h4 {...classes('small-title')}>{smallTitle}</h4>
            <form onSubmit={this.onFormSubmit}>
              <div {...classes('title-wrapper')}>
                <input {...classes('input')} type="email" name="email" placeholder={title} />
                <button type="submit" value="Subscribe">
                  <span {...classes('title-arrow')}>
                    <ArrowRight />
                  </span>
                </button>
              </div>
            </form>
            {false && (
              <Link href={link}>
                <a {...classes('title-wrapper')}>
                  <h3 {...classes('title')}>{title}</h3>
                  <span {...classes('title-arrow')}>
                    <ArrowRight />
                  </span>
                </a>
              </Link>
            )}
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
