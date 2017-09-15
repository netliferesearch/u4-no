import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  buttonClickHandler() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    return (
      <div className="c-toc-mobile">
        <button
          onClick={this.buttonClickHandler}
          className={
            this.state.menuOpen ? (
              'c-toc-mobile__content c-toc-mobile__content--open'
            ) : (
              'c-toc-mobile__content'
            )
          }
        >
          <img alt="Table of contents icon" src="/static/table-of-contents-icon.svg" />
        </button>
      </div>
    );
  }
}
