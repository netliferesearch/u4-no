import React from 'react';
import {
  CreativecommonsCC,
  CreativecommonsBY,
  CreativecommonsNC,
  CreativecommonsND,
} from '../icons';

export const Disclaimers = () => {
  return (
    <div className="c-disclaimers">
      <div className="c-disclaimers__container">
        <div className="c-disclaimers__content c-disclaimers__disclaimer">
          <hr className="u-section-underline--no-margins" />
          <p>
            All views in this text are the author(s)’, and may differ from the U4 partner agencies’
            policies.
          </p>
        </div>
        <div className="c-disclaimers__content c-disclaimers__licences">
          <hr className="u-section-underline--no-margins" />
          <p>
            This work is licenced under a Creative Commons Attribution-NonCommercial-NoDerivatives
            4.0 International licence (
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>)
          </p>
          <p className="c-disclaimers__link">
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
              <CreativecommonsCC className="page2-ccimage" />
              <CreativecommonsBY className="page2-ccimage" />
              <CreativecommonsNC className="page2-ccimage" />
              <CreativecommonsND className="page2-ccimage" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
