import React from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'person',
  prefix: 'c-',
});

const Person = ({ person, linkLabel = 'Bio' }) => (
  <div {...classes('item')}>
    {person.image ? (
      <figure {...classes('item-figure')}>
        <img src={`${person.image.asset.url}?w=600&h=500&fit=crop&crop=focalpoint`} />
      </figure>
    ) :
      <figure {...classes('item-figure')}>
        <img src={'https://cdn.sanity.io/images/1f1lcoov/production/t3Yvuyac5OKZbUz1Sc6HFKeW-684x892.jpg?w=600&h=600&fit=crop&crop=focalpoint'} />
      </figure>
    }
    <div {...classes('item-body')}>
      <div><h3 {...classes('item-title')}>{person.firstName && person.firstName} {person.surname && person.surname}</h3>
        <small {...classes('item-subtitle')}>{person.position && person.position}Senior program advisor</small></div>
      <div {...classes('item-meta')}>
        {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}<br />
        <a href="tel:41044511">+47 410 445 11</a>
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
