import React from 'react';
import { useFormValue } from 'sanity';
import styles from './PreviewLinksComponent.css?inline';
// import AnchorButton from 'part:@sanity/components/buttons/anchor';
import { buildUrl, previewUrl } from './buildUrl';

const previewDomain = 'https://preview.u4.no';

class PreviewLinksComponent extends React.PureComponent {
  focus() {
    // no-op
  }
  render() {
    const title = useFormValue([`title`]);
    return (
      <div className={styles.buttonGroup}>
        {this.props.document._id?.startsWith('draft') && (
          <span className={styles.buttonSubgroup}>
            <AnchorButton
              inverted
              padding="small"
              href={`${previewDomain}/${previewUrl( this.props.document )}`}
              target="_blank"
              title="Preview draft page"
            >
              Preview
            </AnchorButton>
            {this.props.document._type === 'publication' && (
              <AnchorButton
                inverted
                padding="small"
                href={`${previewDomain}/${previewUrl( this.props.document )}/shortversion`}
                target="_blank"
                title="Preview short version"
              >
                Preview short version
              </AnchorButton>
            )}
            {this.props.document._type === 'publication' && (
              <AnchorButton
                inverted
                padding="small"
                href={`${previewDomain}/previewpdf/${this.props.document._type}/${
                  this.props.document._id
                }.pdf`}
                target="_blank"
                title="Preview draft as pdf"
              >
                Preview pdf
              </AnchorButton>
            )}
          </span>
        )}
        {this.props.document?.slug?.current && (
          <span className={styles.buttonSubgroup}>
            <AnchorButton
              inverted
              padding="small"
              href={`${previewDomain +
                buildUrl({ _type: this.props.document._type, slug: this.props.document.slug })}`}
              target="_blank"
              title="View page on site"
            >
              View
            </AnchorButton>
            {this.props.document._type === 'publication' && (
              <AnchorButton
                inverted
                padding="small"
                href={`${previewDomain}/publications/${this.props.document.slug.current}.pdf`}
                target="_blank"
                title="View pdf on site"
              >
                View pdf
              </AnchorButton>
            )}
          </span>
        )}
      </div>
    );
  }
}

export default PreviewLinksComponent;
