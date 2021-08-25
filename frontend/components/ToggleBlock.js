import React, { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers/serializers';
import { ArrowDown } from './icons/ArrowDown';

export const ToggleBlock = ({ title = '', content = '', children }) => {
  const [open, toggleOpen] = useState(false);

  return (
    <div className="c-toggle-block c-meta" onClick={() => toggleOpen(!open)}>
      <hr className="u-section-underline--no-margins" />
      <div className="c-toggle-block__h">
        <h3 className="u-primary-heading">{title}</h3>
        <div className="c-toggle-block__icon">
          <ArrowDown />
        </div>
      </div>
      {open && (
        <div className={`c-toggle-block__content`}>
          {typeof content === 'string' && <p>{content}</p>}
          {typeof content !== 'string' && (
            <BlockContent blocks={content} serializers={serializers} />
          )}
          {children}
        </div>
      )}
    </div>
  );
};

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'react-autobind';

// import Link from 'next/link';
// import ArrowRight from './icons/ArrowRight';
// import BEMHelper from 'react-bem-helper';
// import BlockContent from '@sanity/block-content-to-react';
// import { DownArrowButton } from '../components/buttons';
// import serializers from './serializers/serializers';

// const classes = BEMHelper({
//   name: 'toggle-block',
//   prefix: 'c-',
// });

// class ToggleBlock extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       active: props.active || false,
//       activeClass: 'icon--active',
//     };
//     autobind(this);
//   }

//   toggle(e) {
//     e.preventDefault();
//     this.setState({
//       active: !this.state.active,
//     });
//   }
//   render() {
//     const { content = [], title = '', modifier = '' } = this.props;

//     return (
//       <div {...classes(null, modifier)}>
//         <div {...classes('item')}>
//           <div {...classes('title', modifier)} onClick={this.toggle}>
//             <div {...classes(null, this.state.active ? this.state.activeClass : 'icon')}>
//               <DownArrowButton modifier="icon" text="" />
//             </div>
//             <span {...classes('title-text')}>{title}</span>
//           </div>
//           {this.state.active ? (
//             <div {...classes('content')}>
//               {typeof content === 'string' && <p>{content}</p>}
//               {typeof content !== 'string' && (
//                 <BlockContent blocks={content} serializers={serializers} />
//               )}
//               {this.props.children}
//             </div>
//           ) : null}
//         </div>
//       </div>
//     );
//   }
// }

// ToggleBlock.propTypes = {
//   title: PropTypes.string,
//   content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
//   modifier: PropTypes.string,
// };

// export default ToggleBlock;
