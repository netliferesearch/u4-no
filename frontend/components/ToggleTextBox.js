import BlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import { DownArrowButton } from '../components/buttons';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'textbox',
  prefix: 'c-',
});

class ToggleTextBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active || false,
      activeClass: 'expanded',
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
    const { content = [] } = this.props;

    return (
      <div {...classes('container', this.state.active ? 'expanded' : 'collapsed')}>
        <a
          onClick={this.toggle}
          {...classes('expand')}
          title={
            this.state.active ? 'Click to collapse this section' : 'Click to expand this section'
          }
        >
          <DownArrowButton modifier="icon" text="" />
        </a>
        <div {...classes('content')}>
          {typeof content === 'string' && <p>{content}</p>}
          {typeof content !== 'string' && (
            <BlockContent blocks={content} serializers={serializers} />
          )}
        </div>
      </div>
    );
  }
}

ToggleTextBox.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  modifier: PropTypes.string,
};

export default ToggleTextBox;
