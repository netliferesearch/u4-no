import React from 'react';
import Link from 'next/link';
import BEMHelper from 'react-bem-helper';
import buildUrl from '../helpers/buildUrl';
import ArrowRight from './icons/ArrowRight';

const classes = BEMHelper({
  name: 'simple-mosaic',
  prefix: 'c-',
});

const SimpleMosaic = ({ resources = [], cta = '' }) => (
  <div {...classes()}>
    {resources
      .map(item => (item.target ? item.target : item))
      .map(item => {
        const linkTo =
          item._type === 'course' ? buildUrl({ _type: 'course', slug: item.slug }) : item.link;
        return (
          <div {...classes('item')} key={item.title}>
            <Link href={linkTo}>
              <div {...classes('title')}>{item.title}</div>
              <div>
                {item.lead && item.lead.split('\n').map((i, index) => <p key={index}>{i}</p>)}
              </div>
              {cta && (
                <div {...classes('cta')}>
                  {cta} &nbsp; <ArrowRight />
                </div>
              )}
            </Link>
          </div>
        );
      })}
  </div>
);

export default SimpleMosaic;
