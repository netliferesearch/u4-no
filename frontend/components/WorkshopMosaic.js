import React from 'react';
import { LinkToItem } from './';
import BEMHelper from 'react-bem-helper';
import { Pin } from './icons';

const classes = BEMHelper({
  name: 'workshop-mosaic',
  prefix: 'c-',
});

const WorkshopMosaic = ({ resources = [] }) => {
  return(
  <div {...classes()}>
    {resources.map(item => (
      <div {...classes('item')} key={item.target._id}>
        <LinkToItem _type={item.target._type} slug={item.target.slug}>
          <a>
            <Pin {...classes('icon')} />
            <div {...classes('title')}>{item.target.title}</div>
            <div>{item.target.lead && item.target.lead.split('\n').map((i, index) => <p key={index}>{i}</p>)}</div>
          </a>
        </LinkToItem>
      </div>
    ))}
  </div>
  );
};

export default WorkshopMosaic;
