import React from 'react';
import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const Mosaic = ({ resources = [] }) => (
  <div className="c-mosaic">
    {resources.length ? (
      <div
        className={`c-mosaic_item ${Object.keys(resources).length == 1 && 'c-mosaic_item--single'}`}
        style={{
          backgroundImage: `url(${resources[0].imageUrl})`,
        }}
      />
    ) : null}
    {resources.map(
      (
        { title = '', _id = '', _type = '', publicationType = '', slug = '', imageUrl = '', titleColor = '#FFF' },
        index,
      ) => (
        <Link route={buildUrl({ _type, slug })}>
          <a
            className={`c-mosaic_item ${index % 4 === 2
              ? 'c-mosaic_item--backgroundImage'
              : ''} ${index % 4 === 2 && titleColor === '#000'
              ? 'c-mosaic_item--backgroundImage-invert'
              : ' '}`}
            style={{
              backgroundImage: `url(${index % 4 === 2 ? imageUrl : ''})`,
            }}
          > {console.log(imageUrl)}
            <div className="c-mosaic_item-content">
              <div
                className="c-mosaic_item-content__meta"
                style={{
                  color: index % 4 === 2 ? titleColor : ' ',
                }}
              >
                {publicationType}
              </div>
              <div>
                <h3
                  className="c-mosaic_item-title"
                  style={{
                    color: index % 4 === 2 ? titleColor : ' ',
                  }}
                >
                  {title}
                </h3>
              </div>
            </div>
          </a>
        </Link>
      ),
    )}
  </div>
);

export default Mosaic;
