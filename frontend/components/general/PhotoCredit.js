import React from 'react';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';



export const PhotoCredit = ({ image = {}, showCaption = true }) => {
  return (
    <div className="c-disclaimers">
      <div className="c-disclaimers__container">
        <h4 className="u-secondary-heading u-secondary-h3">Photo</h4>
        <hr className="u-section-underline--dark-grey" />
        <div className="c-disclaimers__content">
        <PhotoCaptionCredit image={image} showCaption={false} />
        </div>
      </div>
    </div>
  );
};

