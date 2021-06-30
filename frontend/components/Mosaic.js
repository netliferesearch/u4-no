import React from 'react';
import LinkToItem from './LinkToItem';

const Mosaic = ({ resources = [], alt = false }) => (
  <div className="c-mosaic">
    {resources
      .map(resource => (resource.target ? resource.target : resource))
      .filter(({ _id = '' }) => _id)
      // loops through lists and return only a set with resources with unique ids
      .reduce((x, y) => (x.map(({ _id }) => _id).includes(y._id) ? x : [...x, y]), [])
      .map(
        (
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
          index
        ) => (
          <LinkToItem key={_id} type={_type} slug={slug}>
            <a
              className={`c-mosaic_item ${
                index % 4 === 0 ? 'c-mosaic_item--backgroundImage' : ''
              } ${
                index % 4 === 0 && titleColor === '#000'
                  ? 'c-mosaic_item--backgroundImage-invert'
                  : ' '
              }`}
              style={{
                backgroundImage:
                  imageUrl && index % 4 === 0 ? `url(${imageUrl}?auto=format&w=800&q=70)` : '',
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
          </LinkToItem>
        )
      )}
  </div>
);

export default Mosaic;
