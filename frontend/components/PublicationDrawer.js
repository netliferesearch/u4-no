import React, { Component } from 'react';
import autoBind from 'react-autobind';
import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const RecommendedResource = ({
  _id = '',
  lead = '',
  _type = '',
  publicationType = {},
  title = '',
  slug,
}) => {
  const type = publicationType.title ? `${_type}: ${publicationType.title}` : _type;
  return (
    <div className="c-simple-mosaic__item">
      <div>{type}</div>
      <div className="c-simple-mosaic__title">{title}</div>
      <Link route={buildUrl({ _type, slug })}>
        <a className="c-simple-mosaic__cta">Read more here</a>
      </Link>
    </div>
  );
};

const RecommendedResources = ({ relatedContent = [] }) => (
  <div className="c-simple-mosaic">
    {relatedContent.slice(0, 3).map(res => <RecommendedResource {...res} />)}
  </div>
);

export default class PublicationDrawer extends Component {
  constructor(props) {
    super(props);
    const { _type = '' } = props;
    // drawer should only be closed when viewing publications
    this.state = { isOpen: _type !== 'publication' };
    autoBind(this);
  }

  openDrawer() {
    this.setState({ isOpen: true });
  }

  render() {
    const { relatedContent = [] } = this.props;
    return (
      <div>
        {!this.state.isOpen && (
          <div className="c-publication-drawer">
            <div className="u-1/1 u-tc u-margin-top-huge">
              <button className="" onClick={this.openDrawer}>
                Read the whole publication
              </button>
            </div>
            {relatedContent.length > 0 && (
              <div className="o-wrapper">
                <h2>We also recommend</h2>
                <RecommendedResources relatedContent={relatedContent} />
              </div>
            )}
          </div>
        )}
        {this.state.isOpen && this.props.children}
      </div>
    );
  }
}
