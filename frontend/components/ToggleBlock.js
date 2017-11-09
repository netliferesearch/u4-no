import React, { Component } from 'react';
import autobind from 'react-autobind';


import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { DownArrowButton } from '../components/buttons';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'toggle-block',
  prefix: 'c-',
});


class ToggleBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active || false,
      activeClass: 'icon--active',
    };
    autobind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      active: !this.state.active,
    });
  }
  render() {
    const { content, title } = this.props;

    return (
      <div {...classes()}>
        <div {...classes('item')}>
          <div {...classes('title')} onClick={this.toggle}>
            <div {...classes(null, this.state.active ? this.state.activeClass : 'icon')}>
              <DownArrowButton modifier="icon" text="" />
            </div>
            <span {...classes('title-text')}>{title}</span>
          </div>
          {this.state.active ? (
            <div {...classes('content')}>
              {typeof content === 'string' && <p>{content}</p>}
              {typeof content !== 'string' && <BlockContent blocks={content} serializers={serializers} />}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ToggleBlock;
