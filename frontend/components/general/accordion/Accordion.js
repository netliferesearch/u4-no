import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export const Accordion = ({ trigger, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`c-accordion  ${expanded ? 'c-accordion--expanded' : ''}`}>
      <div type="button" className="c-accordion__toggle" onClick={() => setExpanded(!expanded)}>
        {trigger}
      </div>
      <CSSTransitionGroup
        transitionName={'c-accordion-'}
        transitionAppear={true}
        transitionAppearTimeout={200}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        {expanded && <div className="c-accordion__content">{children}</div>}
      </CSSTransitionGroup>
    </section>
  );
};
