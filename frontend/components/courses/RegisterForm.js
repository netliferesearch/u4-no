import React, { useRef, useState } from 'react';
import ClientOnlyPortal from '../general/ClientOnlyPortal';
import { CloseButton } from '../general/buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../helpers/hooks';

/**
 * V2 - RegiserForm component to be used in CourseHeader component
 * @param {number} courseType
 */

export const RegisterForm = ({ courseType }) => {
  const [open, setOpen] = useState();
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <button className="c-btn c-btn--primary" onClick={() => setOpen(true)}>
        Register
      </button>
      {open && <FormModal title="Register" courseType={courseType} setOpen={setOpen} />}
    </div>
  );
};

export const FormModal = props => {
  const { title = '', courseType = 0, setOpen } = props;
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  const handleApplyClick = () => {
    setOpen(false);
  };

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  };

  return (
    <ClientOnlyPortal selector="#modal">
      <aside
        className="c-modal__cover"
        aria-modal="true"
        tabIndex="-1"
        role="dialog"
        onKeyDown={onKeyDown}
      >
        <div className="c-modal__area c-modal--form" ref={ref}>
          <div className="c-modal__top">
            <h3 className="u-secondary-heading u-secondary-h2 u-text--dark-blue">{title}</h3>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className={`c-modal__content ${courseType === 18 ? '' : 'c-modal--partners'}`}>
            {courseType !== 15 && courseType !== 16 && (
              <div className="u-margin-top">
                <div>
                  <iframe
                    title="signup"
                    src={`https://partner.u4.no/signup/?course=${courseType}`}
                    width="100%"
                    height="450px"
                    scrolling="auto"
                    style={{ border: 0, overflow: 'hidden' }}
                  >
                    Your browser seems to have problems with our sign-up form. Send an e-mail to
                    course@u4.no if you wish to sign up for this course.
                  </iframe>
                </div>
              </div>
            )}

            {courseType === 15 && (
              <iframe
                title="Course"
                src="https://partner.u4.no/course/brick1/"
                width="100%"
                height="600px"
                scrolling="no"
                style={{ border: 0, overflow: 'hidden' }}
              >
                Your browser seems to have problems with iframes. Please try a different browser!
              </iframe>
            )}

            {courseType === 16 && (
              <iframe
                title="Course"
                src="https://partner.u4.no/course/brick1-fr/"
                width="100%"
                height="600px"
                scrolling="no"
                style={{ border: 0, overflow: 'hidden' }}
              >
                Your browser seems to have problems with iframes. Please try a different browser!
              </iframe>
            )}
          </div>
        </div>
      </aside>
    </ClientOnlyPortal>
  );
};
