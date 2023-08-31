import React, { useState } from 'react';
//import { CSSTransitionGroup } from 'react-transition-group';

export const Accordion = ({ trigger, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`c-accordion  ${expanded ? 'c-accordion--expanded' : ''}`}>
      <div className="c-accordion__toggle" onClick={() => setExpanded(!expanded)}>
        {trigger}
      </div>
        {expanded && <div className="c-accordion__content">{children}</div>}
    </section>
  );
};
