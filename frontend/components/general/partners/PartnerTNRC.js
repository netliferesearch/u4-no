import React from 'react';
import { tnrcData } from '../tnrc/tnrcData';

export const PartnerTNRC = () => (
  <div className="c-partners__item">
    <p className="c-partners__name">{tnrcData.titleProject}</p>
    <div className="c-partners__logo">
      <a
        href="https://www.worldwildlife.org/initiatives/targeting-natural-resource-corruption"
        target="_blank"
        title={tnrcData.title}
      >
        <img className="u-width--100" src={tnrcData.imgTNRCSmall} alt={tnrcData.title} />
      </a> 
    </div>
    <p className="c-partners__description u-body--small u-text--grey">{tnrcData.textShortUSAID}</p>
  </div>
);
