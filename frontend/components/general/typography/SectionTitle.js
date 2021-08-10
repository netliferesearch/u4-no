import React from 'react';

export const SectionTitle = (props) => {
  return (
    <div>
      <h1 className={'titleHeading' + props.color + props.margin}>
        {props.title}
      </h1>
      <div className={'BlogTitleRectangular' + props.rectangularColor + props.margin}></div>
    </div>
  );
};