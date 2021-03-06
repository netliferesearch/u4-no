import React from 'react';
import { get } from '@sanity/util/paths';
import Button from 'part:@sanity/components/buttons/default';
import FormField from 'part:@sanity/components/formfields/default';
import TextInput from 'part:@sanity/components/textinputs/default';
import { PatchEvent, set, setIfMissing, unset } from 'part:@sanity/form-builder/patch-event';
import client from 'part:@sanity/base/client';
import styles from './ShortSlugInput.css';
import AnchorButton from 'part:@sanity/components/buttons/anchor';

import { withDocument } from 'part:@sanity/form-builder';
import { withValuePath } from 'part:@sanity/form-builder';

// Fallback slugify function if not defined in field options
function defaultSlugify(value, type) {
  const maxLength = (type.options && type.options.maxLength) || 200;
  const slugifyOpts = { truncate: maxLength, symbols: true };
  return value ? speakingurl(value, slugifyOpts) : '';
}

const defaultState = {
  inputText: undefined,
  loading: false,
};

class ShortSlugInput extends React.PureComponent {
  _textInput;
  _isMounted;

  static defaultProps = {
    value: { current: undefined },
    readOnly: false,
    onChange() {},
    markers: [],
  };

  state = defaultState;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  updateCurrent(current) {
    const { onChange, type } = this.props;
    if (!current) {
      onChange(PatchEvent.from(unset([])));
      return;
    }
    onChange(PatchEvent.from(setIfMissing({ _type: type.name }), set(current, ['current'])));
  }
  slugify(sourceValue) {
    if (!sourceValue) {
      return Promise.resolve(sourceValue);
    }
    const { type } = this.props;
    const slugify = get(type, ['options', 'slugify'], defaultSlugify);
    return Promise.resolve(slugify(sourceValue, type));
  }

  // this is called by the form builder whenever this input should receive focus
  focus = () => {
    if (this._textInput) {
      this._textInput.focus();
    }
  };
  setTextInput = (input) => {
    this._textInput = input;
  };
  handleChange = (event) => {
    this.updateCurrent(event.target.value);
  };
  handleFocusCurrent = (event) => {
    this.props.onFocus(['current']);
  };
  handleGenerateSlug = () => {
    console.log('will generate slug now');
    const { type } = this.props;
    const source = get(type, ['options', 'source']);
    if (!source) {
      // eslint-disable-next-line no-console
      console.error(`Source is missing. Check source on type "${type.name}" in schema`);
      return;
    }

    this.setState({ loading: true });
    this.getNewFromSource()
      .then((newFromSource) => this.slugify(newFromSource || ''))
      .then((newSlug) => this.updateCurrent(newSlug))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(`An error occured while slugifying:\n${err.message}\n${err.stack}`);
      })
      .then(() => this._isMounted && this.setState({ loading: false }));
  };
  hasSource = () => {
    const { type, document } = this.props;
    const source = get(type, ['options', 'source'], []);
    return typeof source === 'function' ? true : Boolean(get(document, source));
  };

  getNewFromSource = () => {
    const { getValuePath, type, document } = this.props;
    const parentPath = getValuePath().slice(0, -1);
    const parent = get(document, parentPath);
    const source = get(type, ['options', 'source'], []);
    return Promise.resolve(
      typeof source === 'function'
        ? source(document, { parentPath, parent })
        : get(document, source)
    );
  };

  // copy shorturl to clipboard
  copySlug = () => {
    const el = document.createElement('textarea');
    el.value = this.props.type.options.urlPrefix + this.props.value.current;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    const { value, type, level, markers, readOnly } = this.props;
    const { loading, inputText } = this.state;
    const hasSourceField = type.options && type.options.source;
    const hasUrlPrefix = type.options && type.options.urlPrefix;
    const formFieldProps = {
      label: type.title,
      description: type.description,
      level: level,
      markers,
    };
    const validation = markers.filter((marker) => marker.type === 'validation');
    const errors = validation.filter((marker) => marker.level === 'error');
    return (
      <FormField {...formFieldProps}>
        <div className={styles.wrapper}>
          <div className={styles.prefixText}>{type.options && type.options.urlPrefix}</div>
          <div className={styles.input}>
            <TextInput
              ref={this.setTextInput}
              customValidity={errors.length > 0 ? errors[0].item.message : ''}
              disabled={loading}
              placeholder={type.options.placeholder || type.placeholder}
              onChange={this.handleChange}
              onFocus={this.handleFocusCurrent}
              value={typeof inputText === 'string' ? inputText : value.current}
              readOnly={readOnly}
            />
          </div>
          {hasSourceField && (
            <Button
              className={styles.button}
              inverted
              disabled={readOnly || loading || !this.hasSource()}
              loading={loading}
              onClick={this.handleGenerateSlug}
            >
              Generate
            </Button>
          )}
          {hasUrlPrefix && value.current && (
            <Button
              className={styles.button}
              inverted
              disabled={readOnly || loading || !this.hasSource()}
              loading={loading}
              onClick={this.copySlug}
            >
              Copy
            </Button>
          )}
        </div>
      </FormField>
    );
  }
}
export default withValuePath(withDocument(ShortSlugInput));
