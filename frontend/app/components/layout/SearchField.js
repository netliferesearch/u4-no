"use client";

import Downshift from 'downshift';
import { useRouter, useSearchParams } from 'next/navigation';
import { React, useState, useEffect, useRef } from 'react';
import { LoaderV2 } from 'components/LoaderV2';
import { SearchIcon } from 'components/icons/SearchIcon';
import { useDispatch } from 'react-redux';
import { updateSearchPageNum } from 'helpers/redux-store';

export const SearchField = props => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  useEffect(
    () => {

      const search = searchParams.get('search');
      const { current: input } = inputReference;
      if (input) {
        // Trick to put caret after word in input field.
        // Source: https://stackoverflow.com/a/2345915
        input.focus();
        input.value = '';
        input.value = searchValue;
      }
    },
    [searchParams]
  );
  let inputReference = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    updateSearch({ urlUpdateType: 'push', value: e.target.value });
  };
  const updateSearch = ({ urlUpdateType, value = '' }) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set('search', value);
    queryParams.set('searchPageNum', 1);
    const updatedQueryParams = queryParams.toString();

    if(urlUpdateType === 'replace') {
      router.replace(`/search?${updatedQueryParams}`,  {
        scroll: false,
      })
    } else {
      router.push(`/search?${updatedQueryParams}`,  {
        scroll: false,
      })
    }
    setLoading(false);
  };
  const { modifier, isOpen = false, isAlwaysOpen = false } = props;
  const searchValue = searchParams.get('search') ?? '';
  if (!isOpen && !isAlwaysOpen) {
    return null;
  }
  return (
    <Downshift
      id="autocomplete"
      onChange={props.onChange}
      defaultInputValue={searchValue}
      onInputValueChange={value => {
        if (!value) {
          // also triggered when we click outside of the search field,
          // so we must make sure to not update the search field in that
          // case.
          return;
        }
      }}
    >
      {({ getInputProps, getLabelProps }) => (
        <form onSubmit={handleSubmit} className="c-search-v2">
          <label
            {...getLabelProps({ htmlFor: 'search' })}
            className={`c-search-v2__label ${modifier} u-visually-hidden`}
          >
            Search to find topics, publications, people, services, and more:
          </label>
          <div className="c-search-v2__content">
            {!props.menu ? (
              <input
                ref={inputReference}
                placeholder="What are you looking for?"
                className={`c-search-v2__input ${modifier}`}
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  type: 'search',
                  value: undefined,
                  onKeyDown: event => {
                    // Prevent the user from typing more if search is initiated on
                    // page different from the search page.
                    if (window.location.pathname !== '/search' && loading) {
                      event.preventDefault();
                      event.stopPropagation();
                      return;
                    }
                    // While onChange is called every time the input field
                    // changes value, we need to also listen for the enter key
                    // so that we can re-trigger query.
                    if (event.keyCode === 13) {
                      dispatch(updateSearchPageNum(1));
                      updateSearch({ urlUpdateType: 'push', value: event.target.value });
                    }
                  },
                  onChange: event => {
                    event.persist();
                    const { value = '' } = event.target;
                    if (typingTimeout) clearTimeout(typingTimeout);
                    setTypingTimeout(
                      setTimeout(() => {
                        if (value.length <= 2) {
                          return null; // Do nothing.
                        } else if (window.location.pathname !== '/search') {
                          return updateSearch({ urlUpdateType: 'push', value });
                        }
                        return updateSearch({
                          urlUpdateType: 'replace',
                          value: event.target.value,
                        });
                      }, 500)
                    );
                  },
                })}
              />
            ) : (
              <input
                ref={inputReference}
                placeholder="What are you looking for?"
                className={`c-search-v2__input ${modifier}`}
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  type: 'search',
                  value: undefined,
                  onKeyDown: event => {
                    if (event.keyCode === 13) {
                      updateSearch({ urlUpdateType: 'push', value: event.target.value });
                    }
                  },
                })}
              />
            )}

            <button
              className="c-search-v2__button"
              onClick={() =>
                updateSearch({ urlUpdateType: 'push', value: inputReference.current.value })
              }
              type="submit"
              value="Search"
            >
              {loading ? <LoaderV2 /> : <SearchIcon />}
            </button>
          </div>
        </form>
      )}
    </Downshift>
  );
};
