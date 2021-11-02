import React, { useRef, useState } from 'react';
import { Modal } from '../Modal';
import { SocialShare } from './SocialShare';
// /**
//  * V2 - ShareOpen component with modal
//  */

export const ShareOpen = ({ text = '' }) => {
  const [open, setOpen] = useState();
  const copyRef = useRef(null);
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <button className="c-btn c-btn--secondary c-btn--secondary" onClick={() => setOpen(true)}>
        Share
      </button>
      {open && (
        <Modal type="share" title="Share" setOpen={setOpen}>
          <>
            <h4 className="c-modal__text u-primary-heading" ref={copyRef}>
              {text}
            </h4>
            <SocialShare title={text} />
          </>
        </Modal>
      )}
    </div>
  );
};
