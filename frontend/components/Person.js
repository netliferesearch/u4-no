import React from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'person',
  prefix: 'c-',
});

const Person = ({ person, linkLabel = 'Bio' }) => (
  <div {...classes('item')}>
    {person.featuredImage && (
      <figure {...classes('item-figure')}>
        <img src={person.featuredImage.asset.url} />
      </figure>
    )}
    <div {...classes('item-body')}>
      <h3 {...classes('item-title')}>{person.name}</h3>
      <small {...classes('item-subtitle')}>{person.position && person.position}</small>
      <div {...classes('item-meta')}>
        {person.phone && person.phone}<br />
        {person.email && person.email}
      </div>
      <Link>
        <a>
          <span {...classes('item-link')}>{ linkLabel }</span>  <ArrowRight />
        </a>
      </Link>
    </div>
  </div>
);

export default Person;
