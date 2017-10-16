import React, { Component } from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { DownArrowButton } from '../components/buttons';


const classes = BEMHelper({
  name: 'toggle-block',
  prefix: 'c-',
});

class ToggleBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      activeClass: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      active: !this.state.active,
      activeClass: this.state.active ? '' : 'active',
    });
  }
  render() {
    const { content, title } = this.props;

    return (
      <div {...classes()}>
        <div {...classes('item', this.state.activeClass)}>
          <div
            {...classes('title')}
            onClick={this.toggle}
          >
            <div {...classes('icon', this.state.activeClass)}>
              <DownArrowButton
                text=""
              />
            </div>
            <span {...classes('title-text')}>
              {title}
            </span>
          </div>
          { this.state.active ?
            <div {...classes('content')}>
              <BlockContent blocks={content} />
            </div>
            : null}
        </div>
      </div>
    );
  }
}


export default ToggleBlock;
