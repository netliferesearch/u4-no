import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import buildUrl from '../helpers/buildUrl';
import { Loader } from '../components';
import { MagnifyingGlass } from '../components/icons';
import { Router } from '../routes';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});

class SearchField extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      items: [],
      loading: false,
      placeholder: 'topics',
      placeholderIndex: 0,
      searchQuery: '',
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
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(`/search?search=${e.target.search.value}`);
  }

  handleItemClick({ _type = '', slug = {} }) {
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(buildUrl({ _type, slug }));
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

        <div className="c-search__content">
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
              this.setState({ searchQuery: value });
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

export default SearchField;
