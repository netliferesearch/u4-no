import React from 'react';
import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const Mosaic = ({ resources = [], alt = false }) => (
  <div className="c-mosaic">

    {resources
      .map(resource => (resource.target ? resource.target : resource))
      .map((
          {
            title = '',
            _id = '',
            _type = '',
            publicationType = '',
            slug = '',
            imageUrl,
            titleColor = '#FFF',
          },
          index,
        ) => (
          <Link key={_id} route={buildUrl({ _type, slug })}>
            <a
              className={`c-mosaic_item ${index % 4 === 0
                ? 'c-mosaic_item--backgroundImage'
                : ''} ${index % 4 === 0 && titleColor === '#000'
                ? 'c-mosaic_item--backgroundImage-invert'
                : ' '}`}
              style={{
                backgroundImage: `url(${index % 4 === 0 ? imageUrl : ''})`,
              }}
            >
              <div
                className="c-mosaic_item-content"
                style={{
                  color: index % 4 === 0 ? titleColor : ' ',
                }}
              >
                <div className="c-mosaic_item-content__meta">
                  {publicationType._ref ? publicationType._ref : publicationType}
                </div>
                <div>
                  <h3 className="c-mosaic_item-title">
                    {title}
                  </h3>
                </div>
              </div>
            </a>
          </Link>
        ))}
  </div>
);

export default Mosaic;
