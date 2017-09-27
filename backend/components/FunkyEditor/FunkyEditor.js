import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'md5';
import axios from 'axios';
import querystring from 'querystring'
import SlateEditor from '@sanity/form-builder/lib/inputs/BlockEditor-slate'

const apiKey = "9T0600IHQ16WDV2B3GCJVA7E19N0BEVL";
const readableUrl = 'https://api.readable.io/api/text/';
const requestTime = () => Math.floor(new Date().getTime() / 1000);
const apiSignature = () => ({ token: md5(apiKey + requestTime()), time: requestTime() })

export default class FunkyEditor extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }

  handleReadable = text => {
    if (text.length % 50) {

      const { token, time } = apiSignature()
      axios.post(readableUrl,
        querystring.stringify({ text })
        , {
        headers: {
          'API_SIGNATURE': token,
          'API_REQUEST_TIME': time,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          text
        }
        }).then(data => console.log(data))
    }
  }

  handleChange = event => {
    this.props.onChange(event)
    this.setState({
      text: event.patches.map(e => e.value.map(e => e.children.map(t => t.text))).join()
    })
    this.handleReadable(this.state.text)
  }

  render() {
    const { type, value = [], level } = this.props

    return (
      <div>
        <SlateEditor
          type={type}
          level={level}
          value={value === undefined ? '' : value}
          onChange={this.handleChange}
        />
        <p>Letter count: {this.state.letter_count} - Reading time: {this.state.reading_time} - Readable.io rate: {this.state.rating}</p>
      </div>
    )
  }
}
