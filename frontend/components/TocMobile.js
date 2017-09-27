import React, { Component } from 'react';
import ArticleTableOfContents from './ArticleTableOfContents';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.tocItemHandler = this.tocItemHandler.bind(this);
  }

  buttonClickHandler() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  tocItemHandler() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { content = [] } = this.props;
    return (
      <div className={this.state.menuOpen ? 'c-toc-mobile c-toc-mobile--open' : 'c-toc-mobile'}>
        <div className="c-toc-mobile__menu">
          <h2>Table of contents</h2>
          <ArticleTableOfContents onItemSelected={this.tocItemHandler} content={content} />
        </div>
        <button className="c-toc-mobile__button" onClick={this.buttonClickHandler}>
          <img alt="Table of contents icon" src="/static/table-of-contents-icon.svg" />
        </button>
      </div>
    );
  }
}
