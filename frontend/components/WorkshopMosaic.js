import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { Pin } from './icons';

const classes = BEMHelper({
  name: 'workshop-mosaic',
  prefix: 'c-',
});

const WorkshopMosaic = ({ resources = [] }) => (
  <div {...classes()}>
    {console.log(resources)}
    {resources.map(item =>
      (
        <div {...classes('item')}>
          <Link to={'#'} ><a>
            <Pin {...classes('icon')} />
            <div {...classes('title')}>
              {item.title}
            </div>
            <div>
              {item.subtitle && <BlockContent blocks={item.subtitle} /> }
            </div>
          </a></Link>
        </div>
      ),
    )}
  </div>
);

export default WorkshopMosaic;
