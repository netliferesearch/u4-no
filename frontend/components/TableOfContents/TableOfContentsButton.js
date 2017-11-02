import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleArticleMenu, saveScrollPosition } from '../../helpers/redux-store';

const TableOfContentsButton = (props) => {
  const {
    toggleArticleMenu = () => {},
    storedScrollPosition = false,
    saveScrollPosition = () => {},
    isArticleMenuOpen = false,
  } = props;
  return (
    <button
      className="c-article-nav-fullscreen-button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          // if there is no window object to manipulate
          // all we can do is just toggle
          toggleArticleMenu();
        } else if (!isArticleMenuOpen) {
          // Before opening the menu we make sure to remember where we were
          // source: https://stackoverflow.com/a/14384091
          const yPosition = window.pageYOffset || document.documentElement.scrollTop;
          saveScrollPosition(yPosition);
          toggleArticleMenu();
        } else if (isArticleMenuOpen) {
          // after closing the open menu we check if we have previously stored
          // a scroll position. If so, we apply positioning after the content has been
          // rendered back unto the page.
          toggleArticleMenu();
          if (storedScrollPosition) {
            setTimeout(() => {
              window.scrollTo(0, storedScrollPosition);
            }, 1);
          }
        }
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
  saveScrollPosition: bindActionCreators(saveScrollPosition, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableOfContentsButton);
