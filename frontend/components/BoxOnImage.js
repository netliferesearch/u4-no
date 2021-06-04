import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import Link from 'next/link';
import PartnerLogo10 from './icons/PartnerLogo10';
import buildUrl from '../helpers/buildUrl';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'boxOnImage',
  prefix: 'c-',
});

const BoxOnImage = ({
  text = '',
  image = {},
  wide = false,
  headingLeft = '',
  headingRight = '',
  personsLeft = [],
  personsRight = [],
}) => (
  <div {...classes()}>
    <figure {...classes('figure')}>{image && <img alt="" src={image.asset.url} />}</figure>
    <div {...classes('body', wide ? 'wide' : null)}>
      <BlockContent blocks={text} serializers={serializers} />
      {personsLeft.length ? (
        <div className="c-columns">
          <div className="c-columns__item c-columns--two__item c-columns__item--narrow">
            {headingLeft && <h3 className="c-columns__title">{headingLeft}</h3>}
            {personsLeft
              .map(person => (person.target ? person.target : person))
              .map(person => (
                <p key={person._id}>
                  <Link href={buildUrl({ _type: 'person', slug: person.slug.current })}>
                    <a>
                      {person.firstName} {person.surname}
                    </a>
                  </Link>
                </p>
              ))}
            {headingLeft && headingLeft.match(/Transparency/i) && (
              <div>
                <br />
                <br />
                <div className="c-logo">
                  <PartnerLogo10 />
                </div>
              </div>
            )}
          </div>
          {personsRight && (
            <div className="c-columns__item c-columns--two__item c-columns__item--narrow">
              {headingRight && <h3 className="c-columns__title">{headingRight}</h3>}
              {personsRight
                .map(person => (person.target ? person.target : person))
                .map(person => (
                  <p key={person._id}>
                    <Link href={buildUrl({ _type: 'person', slug: person.slug.current })}>
                      <a>
                        {person.firstName} {person.surname}
                      </a>
                    </Link>
                  </p>
                ))}
              {headingRight && headingRight.match(/Transparency/i) && (
                <div>
                  <br />
                  <br />
                  <div className="c-logo">
                    <PartnerLogo10 />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  </div>
);
BoxOnImage.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  image: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  wide: PropTypes.bool,
  headingLeft: PropTypes.string,
  headingRight: PropTypes.string,
  personsLeft: PropTypes.arrayOf(PropTypes.object),
  personsRight: PropTypes.arrayOf(PropTypes.object),
};

BoxOnImage.defaultProps = {
  text: 'No text',
  wide: false,
};

export default BoxOnImage;
