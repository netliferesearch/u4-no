import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TableOfContentsBase from './TableOfContentsBase';
import { toggleArticleMenu } from '../../helpers/redux-store';

export class TableOfContentsButton extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  render() {
    const { content = [], isArticleMenuOpen = false, toggleArticleMenu = () => {} } = this.props;
    return (
      <div className={isArticleMenuOpen ? 'c-toc-mobile c-toc-mobile--open' : 'c-toc-mobile'}>
        <div className="c-toc-mobile__menu">
          <h2>Table of contents</h2>
          <TableOfContentsBase onItemSelected={toggleArticleMenu} content={content} />
        </div>
        <button className="c-toc-mobile__button" onClick={toggleArticleMenu}>
          <img alt="Table of contents icon" src="/static/table-of-contents-icon.svg" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ isArticleMenuOpen }) => ({ isArticleMenuOpen });
const mapDispatchToProps = dispatch => ({
  toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableOfContentsButton);
