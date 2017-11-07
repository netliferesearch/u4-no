import React, { Component } from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'frontpage-feature',
  prefix: 'c-',
});

class FrontpageFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.triggerToggle = this.triggerToggle.bind(this);
  }

  triggerToggle(e) {
    e.preventDefault();
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const { topics } = this.props;
    return (
      <div {...classes()}>
        <section className="o-wrapper-inner o-wrapper--padded">
          <h3 {...classes('heading')}>Knowledge on</h3>
          <ul {...classes('list')}>
            {topics.slice(0, 5).map(topic =>
              (<li {...classes('list-item')}>
                <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                  <a {...classes('link')}>
                    {topic.title}
                  </a>
                </Link>
              </li>),
            )}
          </ul>
          { this.state.active ?
            <ul {...classes('list', 'active')}>
              {topics.slice(5, 50).map(topic =>
                (<li {...classes('list-item')}>
                  <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                    <a {...classes('link')}>
                      {topic.title}
                    </a>
                  </Link>
                </li>),
              )}
            </ul>
            : null
          }
          <button {...classes('btn')} onClick={this.triggerToggle}>
            <ArrowRight {...classes('arrowdown', this.state.active ? 'active' : null)} />
            { this.state.active ?
              <span>View all topics</span>
              : <span>View fewer topics</span>
            }
          </button>
        </section>
      </div>
    );
  }
}

export default FrontpageFeature;
