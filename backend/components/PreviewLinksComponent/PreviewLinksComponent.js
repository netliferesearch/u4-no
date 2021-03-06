import React from 'react';
import { withDocument } from 'part:@sanity/form-builder';
import styles from './PreviewLinksComponent.css';
import AnchorButton from 'part:@sanity/components/buttons/anchor';
import buildUrl from './buildUrl';

const previewUrl = 'https://u4-frontend-staging.herokuapp.com';

class PreviewLinksComponent extends React.PureComponent {
  focus() {
    // no-op
  }
  render() {
    return !this.props.document.slug ? null : (
      <div className={styles.buttonGroup}>
        {this.props.document._id.startsWith('draft') && (
          <span className={styles.buttonSubgroup}>
            <AnchorButton
              inverted={true}
              padding="small"
              href={`${previewUrl}/preview/${this.props.document._type}/${this.props.document._id}`}
              target="_blank"
              title="Preview draft page"
            >
              Preview
            </AnchorButton>
            {this.props.document._type === 'publication' && (
              <AnchorButton
                inverted={true}
                padding="small"
                href={`${previewUrl}/previewpdf/${this.props.document._type}/${
                  this.props.document._id
                }`}
                target="_blank"
                title="Preview draft as pdf"
              >
                Preview pdf
              </AnchorButton>
            )}
          </span>
        )}
        <span className={styles.buttonSubgroup}>
          <AnchorButton
            inverted={true}
            padding="small"
            href={`${previewUrl +
              buildUrl({ _type: this.props.document._type, slug: this.props.document.slug })}`}
            target="_blank"
            title="View page on site"
          >
            View
          </AnchorButton>
          {this.props.document._type === 'publication' && (
            <AnchorButton
              inverted={true}
              padding="small"
              href={`${previewUrl}/publications/${this.props.document.slug.current}.pdf`}
              target="_blank"
              title="View pdf on site"
            >
              View pdf
            </AnchorButton>
          )}
        </span>
      </div>
    );
  }
}

export default withDocument(PreviewLinksComponent);
