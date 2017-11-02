import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleArticleMenu } from '../../helpers/redux-store';

const TableOfContentsButton = (props) => {
  const { toggleArticleMenu = () => {} } = props;
  return (
    <button
      className="c-article-nav-fullscreen-button"
      onClick={() => {
        toggleArticleMenu();
      }}
    >
      {props.isArticleMenuOpen ? (
        <img alt="Close icon" src="/static/close.svg" />
      ) : (
        <img alt="Table of contents icon" src="/static/table-of-contents-icon.svg" />
      )}
    </button>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableOfContentsButton);
