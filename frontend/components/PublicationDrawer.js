import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { togglePublicationDrawer } from '../helpers/redux-store';
import { RecommendedResources } from './';

const PublicationDrawer = ({
  _type = '',
  togglePublicationDrawer = () => {},
  isPublicationDrawerOpen = true,
  relatedContent = [],
  children = [],
}) => (
  <div>
    {isPublicationDrawerOpen &&
      _type === 'publication' && (
        <div className="c-publication-drawer">
          <div className="u-1/1 u-tc">
            <div>
              <button
                className="c-btn c-btn--large"
                onClick={togglePublicationDrawer}
              >
                <h3 className="c-btn--body">Read the whole publication</h3>
              </button>
            </div>
          </div>
          {relatedContent.length > 0 && (
            <div className="o-wrapper">
              <h2>We also recommend</h2>
              <RecommendedResources relatedContent={relatedContent} />
            </div>
          )}
        </div>
      )}
    {(!isPublicationDrawerOpen || _type !== 'publication') && children}
  </div>
);

const mapStateToProps = ({ isPublicationDrawerOpen }) => ({ isPublicationDrawerOpen });
const mapDispatchToProps = dispatch => ({
  togglePublicationDrawer: bindActionCreators(togglePublicationDrawer, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PublicationDrawer);
