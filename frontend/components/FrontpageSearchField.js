import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import { Loader } from '../components';
import { MagnifyingGlass } from '../components/icons';
import { withRouter } from 'next/router';

const classes = BEMHelper({
  name: 'frontpage-search',
  prefix: 'c-',
});

class FrontpageSearchField extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      loading: false,
      placeholder: 'topics',
      placeholderIndex: 0,
      searchQuery: '',
      typingTimeout: 0,
    };
  }
  componentDidMount() {
    const strings = ['publications', 'topics', 'people', 'services', 'articles'];
    this.intervalTimer = setInterval(() => {
      this.setState({
        placeholderIndex:
          this.state.placeholderIndex < strings.length - 1 ? this.state.placeholderIndex + 1 : 0,
        placeholder: strings[this.state.placeholderIndex],
      });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: !this.state.loading,
    });
    this.props.router.pushRoute(`/search?search=${e.target.search.value}`);
  }

  render() {
    const { modifier } = this.props;
    return (
      <form onSubmit={this.handleSubmit} {...classes('', modifier, 'u-1/1')}>
        <label
          htmlFor="search"
          {...classes('label', modifier, 'u-margin-bottom-small u-visually-hidden')}
        >
          Search to find topics, publications, people, services, and more:
        </label>

        <div className="c-frontpage-search__content">
          <input
            ref={el => {
              this.el = el;
            }}
            {...classes('input', modifier)}
            id="search"
            name="search"
            placeholder={`Search for ${this.state.placeholder}`}
            type="search"
            value={this.state.searchQuery}
            onChange={event => {
              const { value = '' } = event.target;
              if (!this.state.loading && value.length > 2) {
                if (this.typingTimeout) clearTimeout(this.typingTimeout);
                this.typingTimeout = setTimeout(() => {
                  return this.setState(
                    {
                      searchQuery: value,
                      loading: true,
                    },
                    () => this.props.router.pushRoute(`/search?search=${value}`)
                  );
                }, 500);
              }
              return this.setState({ searchQuery: value });
            }}
          />
          {this.state.searchQuery && (
            <button
              {...classes('button', 'clear')}
              type="button"
              onClick={() => this.setState({ searchQuery: '' })}
            >
              X
            </button>
          )}
          <button {...classes('button')} type="submit" value="Search">
            {this.state.loading ? <Loader /> : <MagnifyingGlass />}
          </button>
        </div>
      </form>
    );
  }
}

FrontpageSearchField.propTypes = {
  modifier: PropTypes.string,
  router: PropTypes.object.isRequired,
};

FrontpageSearchField.defaultProps = {
  modifier: '',
};

export default withRouter(FrontpageSearchField);
