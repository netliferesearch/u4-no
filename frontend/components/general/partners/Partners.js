import React from 'react';
import { PartnersList } from './PartnersList';
import { PartnerTI } from './PartnerTI';
import { PartnerTNRC } from './PartnerTNRC';

export const Partners = ({ partners = [], publicationType = {}, bottom = false }) => {
  return (
    <div
      className={`c-acknowledgements c-partners ${
        bottom ? 'c-acknowledgements--bottom c-meta' : 'c-acknowledgements--side'
      }`}
    >
      {partners && <PartnersList institutions={partners} />}
      {publicationType._id === 'pubtype-3' && <PartnerTI />}
      {publicationType._id === '080dc28c-9d5e-4c14-972f-73f83a206b92' && <PartnerTNRC />}
    </div>
  );
};
