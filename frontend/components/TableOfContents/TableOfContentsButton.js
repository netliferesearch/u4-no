import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleArticleMenu } from '../../helpers/redux-store';

export class TableOfContentsButton extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  render() {
    const { toggleArticleMenu = () => {} } = this.props;
    return (
      <button
        className="c-article-nav-fullscreen-button"
        onClick={() => {
          toggleArticleMenu();
        }}
      >
        <img alt="Table of contents icon" src="/static/table-of-contents-icon.svg" />
      </button>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableOfContentsButton);
