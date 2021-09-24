import React from 'react';
import CreativecommonsCC from '../../icons/CreativecommonsCC';
import CreativecommonsBY from '../../icons/CreativecommonsBY';
import CreativecommonsNC from '../../icons/CreativecommonsNC';
import CreativecommonsND from '../../icons/CreativecommonsND';

export const Disclaimers = ({ title = false }) => {
  return (
    <div className="c-disclaimers">
      <div className="c-disclaimers__container">
        {title ? <h4 className="u-secondary-heading u-secondary-h3">Disclaimer</h4> : null}
        <hr className="u-section-underline--dark-grey" />
        <div className="c-disclaimers__content">
          <p className="u-body--small">
            All views in this text are the author(s)’, and may differ from the U4 partner agencies’
            policies.
          </p>
          <p className="u-body--small">
            This work is licenced under a Creative Commons Attribution-NonCommercial-NoDerivatives
            4.0 International licence (
            <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>)
          </p>
        </div>
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
  );
};
