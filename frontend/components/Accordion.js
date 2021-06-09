import React, { Component } from 'react';
import T from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { CSSTransitionGroup } from 'react-transition-group';
import autobind from 'react-autobind';

const classes = new BEMHelper({
  name: 'accordion',
  prefix: 'c-',
});

export default class Accordion extends Component {
  static propTypes = {
    title: T.string,
    icon: T.string,
    expanded: T.bool,
    children: T.any,
    simple: T.bool,
  };

  static defaultProps = {
    expanded: false,
    simple: false,
  };

  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    autobind(this);
  }

  componentDidMount() {
    this.setState({
      expanded: this.props.expanded,
    });
  }

  handleToggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { icon, title, children, simple, summary = '' } = this.props;
    const { expanded } = this.state;

    const modifiers = { expanded, simple };

    return (
      <section {...classes('', modifiers)}>
        <button type="button" {...classes('toggle')} onClick={this.handleToggle}>
          {icon()}
          <h2 {...classes('title')}>{title}</h2>
          {summary && <p>{summary}</p>}
          <span {...classes('indicator')}>
            {/* !simple && <Icon icon="arrow-down" />*/}
            {/* simple && <Icon type="chevron-down" />*/}
          </span>
        </button>

        <CSSTransitionGroup
          transitionName={classes('wrapper').className}
          transitionEnterTimeout={550}
          transitionLeaveTimeout={200}
        >
          {expanded && <div {...classes('content')}>{children}</div>}
        </CSSTransitionGroup>
      </section>
    );
  }
}
