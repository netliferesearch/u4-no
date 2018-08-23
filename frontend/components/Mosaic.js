import React from 'react';
import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const Mosaic = ({ resources = [], alt = false }) => (
  <div className="c-mosaic">
    {resources
      .map(resource => (resource.target ? resource.target : resource))
      .filter(({ _id = '' }) => _id)
      // loops through lists and return only a set with resources with unique ids
      .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
      .map((
          {
            title = '',
            _id = '',
            _type = '',
            publicationType = '',
            articleType = '',
            slug = '',
            imageUrl = false,
            titleColor = '#FFF',
            firstName = '',
            surname = '',
          },
          index,
        ) => (
          <Link key={_id + index} route={buildUrl({ _type, slug })}>
            <a
              className={`c-mosaic_item ${
                index % 4 === 0 ? 'c-mosaic_item--backgroundImage' : ''
              } ${
                index % 4 === 0 && titleColor === '#000'
                  ? 'c-mosaic_item--backgroundImage-invert'
                  : ' '
              }`}
              style={{
                backgroundImage: `url(${imageUrl && index % 4 === 0 ? `${imageUrl}?w=1200` : ''})`,
              }}
            >
              <div
                className="c-mosaic_item-content"
                style={{
                  color: index % 4 === 0 ? titleColor : ' ',
                }}
              >
                <div className="c-mosaic_item-content__meta">
                  {typeof publicationType === 'string' ? publicationType : ''}
                  {!publicationType && typeof articleType === 'string' ? articleType : ''}
                </div>
                <div>
                  <h3 className="c-mosaic_item-title">
                    {firstName && surname ? `${firstName} ${surname}` : title}
                  </h3>
                </div>
              </div>
            </a>
          </Link>
        ))}
  </div>
);

export default Mosaic;
