import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Pin, ArrowRight } from './icons';
import buildUrl from '../helpers/buildUrl';

const classes = BEMHelper({
  name: 'simple-mosaic',
  prefix: 'c-',
});

const SimpleMosaic = ({ resources = [], cta = '' }) => (
  <div {...classes()}>
    {resources.map(item => (item.target ? item.target : item)).map((item) => {
      const linkTo =
        item._type === 'course' ? buildUrl({ _type: 'course', slug: item.slug }) : item.link;
      return (
        <div {...classes('item')}>
          <Link to={linkTo}>
            <a>
              <div {...classes('title')}>{item.title}</div>
              <div>{item.lead && item.lead.split('\n').map(i => <p>{i}</p>)}</div>
              {cta && (
                <div {...classes('cta')}>
                  {cta} &nbsp; <ArrowRight />
                </div>
              )}
            </a>
          </Link>
        </div>
      );
    })}
  </div>
);

export default SimpleMosaic;
