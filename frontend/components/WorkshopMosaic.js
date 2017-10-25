import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Pin } from './icons';

const classes = BEMHelper({
  name: 'workshop-mosaic',
  prefix: 'c-',
});

const WorkshopMosaic = ({ resources = [] }) => (
  <div {...classes()}>
    {resources.map(item =>
      (
        <div {...classes('item')}>
          <Link to={item.link} ><a>
            <Pin {...classes('icon')} />
            <div {...classes('title')}>
              {item.title}
            </div>
            <div>
              {item.lead && item.lead.split('\n').map(i => <p>{i}</p>) }
            </div>
          </a></Link>
        </div>
      ),
    )}
  </div>
);

export default WorkshopMosaic;
