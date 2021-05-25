import React from 'react';
import Link from 'next/link';
import BEMHelper from 'react-bem-helper';
import { Pin } from './icons';

const classes = BEMHelper({
  name: 'workshop-mosaic',
  prefix: 'c-',
});

const WorkshopMosaic = ({ resources = [] }) => (
  <div {...classes()}>
    {resources.map(item => (
      <div {...classes('item')}>
        <Link route="event.entry" params={{ slug: item.target.slug.current }}>
          <a>
            <Pin {...classes('icon')} />
            <div {...classes('title')}>{item.target.title}</div>
            <div>{item.target.lead && item.target.lead.split('\n').map(i => <p>{i}</p>)}</div>
          </a>
        </Link>
      </div>
    ))}
  </div>
);

export default WorkshopMosaic;
