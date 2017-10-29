import React, { Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import ReactDataSheet from 'react-datasheet';
import styles from './react-datasheet.css';
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

const convertToDataSheet = (data) => {
  if (Array.isArray(data[0])) return data;
  return data.map(row => row.values.map(value => ({ value })));
}
const convertFromDataSheet = (data) => {
  if (!Array.isArray(data[0])) return data;
  return data.map(row => ({ values: row.map(cell => cell.value) }))
}

export default class FunkyTable extends Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    const data = props.value.grid !== undefined ? props.value.grid : [
      [{value:  1}, {value:  3},{value:  3}],
      [{value:  2}, {value:  4},{value:  3}],
      [{value:  2}, {value:  4},{value:  3}],
      [{value:  2}, {value:  4},{value:  3}]
    ]
    this.state = {
      _type: 'funkyTable',
      title: props.value.title !== undefined ? props.value.title : '',
      grid: data
    }
    autobind(this)
  }
  handleTitleChange (event) {
    this.setState({ title: event.target.value })
    this.props.onChange(createPatchFrom({ _type: 'funkyTable', title: event.target.value }))
  }
  handleTableChange (cell, rowI, colJ, value) {
    this.props.onChange(createPatchFrom({_type: 'funkyTable', title: this.state.title, grid: convertFromDataSheet(this.state.grid.map((col) => col.map((rowCell) => (rowCell == cell) ? ({value: value}) : rowCell)))}))
  }
  handleAddRow () {
    this.setState((state) => ({grid: state.grid.concat({values: state.grid[0].values.map(i => '')})}))
  }
  handleRemoveRow () {
    this.setState((state) => ({ grid: this.state.grid.slice(0, this.state.grid.length -1) }))
  }
  handleAddColumn () {
    this.setState((state) => ({grid: state.grid.map(row => ({values: row.values.concat('')}))}))
  }
  handleRemoveColumn () {
    this.setState((state) => ({grid: state.grid.map(row => ({ values: row.values.slice(0,row.values.length - 1) }))}))
  }

  render() {
    const { type, value: sanityData, level, onChange } = this.props
    return (
      <div>
        <div>
          <h3>{type.title}</h3>
          {type.description && <p>{type.description}</p>}
        </div>
        <div>
          <label htmlFor='title'>Table title</label><br />
          <input className={styles.funkyTable} name='title' type='text' onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <button onClick={this.handleAddColumn}>Add column</button> <button onClick={this.handleRemoveColumn}>Delete column</button>
        </div>
        <ReactDataSheet
          className={styles['data-grid']}
          data={convertToDataSheet(this.state.grid)}
          valueRenderer={(cell) => cell.value}
          onChange={(cell, rowI, colJ, value) => {
            this.setState({ grid: this.state.grid.map((row) => row.map((rowCell) => (rowCell == cell) ? ({value: value}) : rowCell)) })
            this.handleTableChange(cell, rowI, colJ, value)
          }}
        />
        <div>
          <button onClick={this.handleAddRow}>Add row</button> <button onClick={this.handleRemoveRow}>Delete row</button>
        </div>
      </div>
    )
  }
}


/* onChange={(cell, rowI, colJ, value) => {
  this.updateDocs({cell, rowI, colJ, value})
}} */
