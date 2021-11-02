import React from 'react';

import BEMHelper from 'react-bem-helper';
import { tnrcData } from './tnrcData';

const classes = BEMHelper({
  name: 'tnrc-footer',
  prefix: 'c-',
});

export const TnrcFooter = ({ publicationTypeId = '' }) => {
  return (
    publicationTypeId == '080dc28c-9d5e-4c14-972f-73f83a206b92' && (
      <div className="c-tnrc-footer">
        <div className="c-tnrc-footer__heading">
          <a href={tnrcData.linkTNRC.href} target="_blank" title={tnrcData.title}>
            <img src={tnrcData.imgTNRC} alt={tnrcData.title} />
          </a>
        </div>

        <div {...classes('logos')}>
          {tnrcData.partners.map((p, index) => (
            <a
              key={index}
              style={{
                width: p.width,
                height: p.height,
                backgroundImage: p.img,
                backgroundSize: p.backgroundSize,
                backgroundPosition: p.backgroundPosition,
              }}
              href={p.href}
              title={p.title}
              target="_blank"
              rel="noopener noreferrer"
            />
          ))}
        </div>

        <div>
          <p  className="c-tnrc-footer__body u-body">
            {tnrcData.text1USAID}{' '}
            <a href={tnrcData.linkUSAID.href} target="_blank" rel="noopener">
              {tnrcData.linkUSAID.label}
            </a>{' '}
            {tnrcData.text2USAID}
          </p>
        </div>
      </div>
    )
  );
};

export default TnrcFooter;
