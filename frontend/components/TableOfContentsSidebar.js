import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import TableOfContentsBase from './TableOfContentsBase';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navFollowScreen: false,
      /**
       * Lodash returns a throttled function which we need to save so that
       * we can later call removeEventListener on that function reference.
       */
      scrollHandler: throttle(() => {
        const elementTarget = document.getElementById('js-scroll-trigger');
        if (!elementTarget) {
          return; // do nothing
        }
        if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
          this.setState(() => ({ navFollowScreen: true }));
        } else {
          this.setState(() => ({ navFollowScreen: false }));
        }
      }, 1000),
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.scrollHandler);
    this.state.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.scrollHandler);
  }

  render() {
    const { content = [] } = this.props;
    return (
      <div
        className={
          this.state.navFollowScreen ? 'c-article-nav c-article-nav--fixed' : 'c-article-nav'
        }
      >
        <TableOfContentsBase onItemSelected={this.tocItemHandler} content={content} />
      </div>
    );
  }
}
