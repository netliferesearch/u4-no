import PropTypes from 'prop-types'
import React from 'react'
import md5 from 'md5';
import axios from 'axios';
import querystring from 'querystring'
import autobind from 'react-autobind'
import BlockEditor from '@sanity/form-builder/lib/inputs/BlockEditor-slate'

const apiKey = "984KMAPJY1PJ0MUI5KE18EAWLT1RE2AO";
const readableUrl = 'https://api.readable.io/api/text/';
const requestTime = () => Math.floor(new Date().getTime() / 1000);
const apiSignature = () => ({ token: md5(apiKey + requestTime()), time: requestTime() })

function extractTextFromBlocks(blocks) {
  return blocks
    .filter(val => val._type === 'block')
    .map(block => {
      return block.children
        .filter(child => child._type === 'span')
        .map(span => span.text)
        .join('')
    }).join('')
}

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
      text: "",
      readable: {
        letter_count: '',
        reading_time: '',
        rating: '',
      }

    }
    autobind(this)
  }
  componentWillMount() {
    const time = requestTime();
    this.setState({ time })
  }

  handleReadable({ patches = [{ value: [] }] }) {
    const { token, time } = apiSignature()
    if (time - this.state.time > 10) {
      const text = extractTextFromBlocks(patches[0].value)

      axios.post(readableUrl, querystring.stringify({ text }), {
        headers: {
          'API_SIGNATURE': token,
          'API_REQUEST_TIME': time,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { text}
        }).then(({ data }) => {
          this.setState({ readable: data })
        })
        this.setState({ time })
    }
  }

  render() {
    const { type, value, level, onChange } = this.props
    const { word_count, reading_time, rating, average_grade_level  } = this.state.readable
    return (
      <div>
        <BlockEditor
          type={type}
          level={level}
          value={value}
          onChange={(changeData) => {
            this.props.onChange(changeData)
            this.handleReadable(changeData)
          }}
        />
        <p>
          {
            rating ?
            <small>
            {`${word_count} ${word_count > 1 ? 'words' : 'word' } -
            ${reading_time === '0:00' ? '' : `${reading_time} minutes` } -
            ${average_grade_level && `Avg. grade level: ${average_grade_level} - `}
            ${rating && `Readable rate: ${average_grade_level}`}
            `}
            </small>
            : (<small>Stats from <a href="https://readable.io">readable.io</a> comes after you start typing...</small>)
          }
        </p>
      </div>
    )
  }
}
