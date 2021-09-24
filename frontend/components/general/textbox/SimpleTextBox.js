import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import serializers from '../../serializers/serializers';

export const SimpleTextBox = ({content}) => {

    return (
        <div className="c-textbox--simple c-textbox__container" >
          <div className="c-textbox__content">
            {typeof content === 'string' && <p>{content}</p>}
            {typeof content !== 'string' && (
              <BlockContent blocks={content} serializers={serializers} />
            )}
          </div>
        </div>
      );

}