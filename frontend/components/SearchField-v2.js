import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import prioritize from './SearchFilters/searchWeighting';
import buildQuery from '../helpers/buildSearchQuery';
import itemTitle from '../helpers/itemTitle';
import itemTypeAsHeading from '../helpers/itemTypeAsHeading';
import buildUrl from '../helpers/buildUrl';
import { LoaderV2 } from '../components';
import { SearchIcon } from '../components/icons';
import { Router } from '../routes';

const classes = BEMHelper({
  name: 'search-v2',
  prefix: 'c-',
});

const generateTitle = ({
  title = false, firstName = false, surname = false, term = false,
}) => {
  if (title) return title;
  if (firstName) return `${firstName} ${surname}`;
  if (term) return term;
  return 'no title';
};

function debounce(fn, time) {
  let timeoutId;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
  return wrapper;
}

class SearchFieldV2 extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      items: [],
      loading: false,
      placeholder: 'topics',
      placeholderIndex: 0,
    };
  }
  componentDidMount() {
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === 'u4-frontend-staging.herokuapp.com'
    ) {
      this.setState({ shouldShow: true });
    }

    // const strings = ['publications', 'topics', 'people', 'services', 'articles'];
    // if (!this.state.items.length === 0) return;
    // this.intervalTimer = setInterval(() => {
    //   this.setState({
    //     placeholderIndex:
    //       this.state.placeholderIndex < strings.length - 1 ? this.state.placeholderIndex + 1 : 0,
    //     placeholder: strings[this.state.placeholderIndex],
    //   });
    // }, 3000);
  }
  componentWillUnmount() {
    // clearInterval(this.intervalTimer);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(`/search-v2?search=${e.target.search.value}`);
  }

  render() {
    const {
      modifier, triggerSearchMenu, isOpen = false, isAlwaysOpen = false,
    } = this.props;

    if (!isOpen && !isAlwaysOpen) {
      return null;
    }

    return (
      <Downshift id="autocomplete" onChange={this.props.onChange}>
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          getLabelProps,
          isOpen,
          clearSelection,
          inputValue,
        }) => (
          <form onSubmit={this.handleSubmit} {...classes()}>
            <label
              {...getLabelProps({ htmlFor: 'search' })}
              {...classes('label', modifier, 'u-visually-hidden')}
            >
              Search to find topics, publications, people, services, and more:
            </label>

            <div className="c-search-v2__content">
              <button tabIndex="1" {...classes('button')} type="submit" value="Search">
                {this.state.loading ? <LoaderV2 /> : <SearchIcon />}
              </button>
              <input
                ref={(el) => {
                  this.el = el;
                }}
                autoFocus
                {...classes('input', modifier)}
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  placeholder: `Search for ${this.state.placeholder}`,
                  type: 'search',
                  // value:
                  //   selectedItem && typeof selectedItem === 'object'
                  //     ? generateTitle(selectedItem)
                  //     : undefined,
                  onChange: (event) => {
                    const value = event.target.value;
                    if (!value) {
                      return;
                    }
                    if (event.keyCode != 8) {
                      // Allow backspace
                      // debounce(
                      //   client
                      //     .fetch(buildQuery({ queryString: value, limit: { from: 0, to: 5 } }))
                      //     .then((results) => {
                      //       const washedResults = results.filter(doc =>
                      //           (doc._type === 'person'
                      //             ? doc.affiliations &&
                      //               doc.affiliations.includes('419c2497-8e24-4599-9028-b5023830c87f')
                      //             : doc));
                      //       const items = prioritize(value, washedResults.map(item => item)); // Added ID to make it unique
                      //       this.setState({ items });
                      //     })
                      //     .catch((error) => {
                      //       console.log(error);
                      //     }),
                      //   600,
                      // );
                    }
                  },
                  onKeyDown: (e) => {
                    // if enter pressed we reload search page with search value
                    if (e.keyCode !== 13) {
                      Router.replaceRoute(`/search-v2?search=${e.target.value}`);
                    } else if (typeof highlightedIndex !== 'number') {
                      // do pushroute on enter to ensure that
                      Router.pushRoute(`/search-v2?search=${e.target.value}`);
                    }
                  },
                })}
              />

              {!isAlwaysOpen && (
                <button {...classes('button')} type="button" onClick={triggerSearchMenu}>
                  ✕
                </button>
              )}
            </div>
          </form>
        )}
      </Downshift>
    );
  }
}

export default SearchFieldV2;
