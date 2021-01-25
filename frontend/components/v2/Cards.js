import React from 'react';
import { Link } from '../../routes';
import BEMHelper from 'react-bem-helper';
import buildUrl from '../../helpers/buildUrl';
import ReactPlayer from 'react-player';

const classes = BEMHelper({
  name: 'simple-mosaic',
  prefix: 'c-',
});

export const Cards = ({ resources = [], cta = '' }) => (
  <div className="c-simple-mosaic c-cards">
    {resources
      .map(item => (item.target ? item.target : item))
      .map(item => {
        const linkTo =
          item._type === 'course' ? buildUrl({ _type: 'course', slug: item.slug }) : item.link;
        return (
          <div key={item._id} {...classes('item')}>
            <Link to={linkTo}>
              <a>
                <div {...classes('item-content')}>
                  <div className="c-cards__image">
                    {item.vimeo ? (
                      <div className={`u-video ${item.vimeo.size || ''}`}>
                        <ReactPlayer
                          controls
                          width="100%"
                          height="0"
                          config={{
                            preload: true,
                          }}
                          style={{
                            margin: '0 auto',
                          }}
                          url={item.vimeo.src}
                        />
                      </div>
                    ) : item.featuredImage ? (
                      <img src={`${item.featuredImage}?w=350&h=170&fit=crop`} />
                    ) : null}
                  </div>
                  <div className="c-cards__text">
                    <div>
                      <h6 className="u-heading--7">{item.title}</h6>
                      <div>{item.lead && item.lead.split('\n').map((i, index) => <p key={index} >{i}</p>)}</div>
                    </div>
                    <div>{cta && <div className="c-btn c-btn--sec">{cta}</div>}</div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
  </div>
);
