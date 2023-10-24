import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import ReactDataSheet from 'react-datasheet'
// import DefaultSelect from 'part:@sanity/components/selects/default';
import styles from './FunkyTable.css?inline'
import {insert, set, unset, setIfMissing} from 'sanity'

/**
 * Create an empty table
 */
const createEmptyGrid = ({defaultNumRows = 10, defaultNumColumns = 4 , defaultValue = '', heading = false }) => {
  const rows = defaultNumRows
  const cols = defaultNumColumns
  const value = ''

  const grid = []
  for (let r = 0; r < rows; r++) {
    const row = { columns: [], heading }
    for (let c = 0; c < cols; c++) {
      row.columns.push(value)
    }
    grid.push(row)
  }
  return grid
}
/**
 * Convert Sanity schema to a format that
 * react-datasheet can read
 * @param {*array} rows
 */
const convertToDataSheet = rows => rows.map(row => row.columns)

export default class FunkyTable extends Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.object,
    display: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    autobind(this)

    /**
     * Load rows from document in Sanity
     */
    const rows = props.value && props.value.rows
    this.state = { dataSheet: rows && convertToDataSheet(rows) }
  }

  componentWillReceiveProps(nextProps) {
    const currentValue = this.props.value || {}
    const nextValue = nextProps.value || {}
    if (!nextValue || !nextValue.rows) {
      this.setState({dataSheet: null})
      return
    }

    if (nextValue.rows && nextValue.rows !== currentValue.rows) {
      this.setState(state => ({dataSheet: convertToDataSheet(nextProps.value.rows)}))
    }
  }

  handleInitializeTable() {
    const {type, onChange} = this.props
    const emptyGrid = createEmptyGrid(type.options)
    onChange(setIfMissing({_type: type.name}), set(emptyGrid, ['rows']))
  }

  handleTableChange(cell, row, column, value) {
    const {onChange, type} = this.props
    onChange(
        setIfMissing({_type: type.name}),
        set(value || '', ['rows', row, 'columns', column])
    )
  }

  handleTitleChange(event) {
    const { onChange, type } = this.props
    const value = event.target.value
    onChange(
        setIfMissing({_type: type.name}),
        value ? set(event.target.value, ['title']) : unset(['title'])
    )
  }
  handleDisplayChange({ value = '' }) {
    const { onChange, type } = this.props
    onChange(
        setIfMissing({_type: type.name}),
        value ? set(value, ['display']) : unset(['display'])
    )
  }
  /* handleHeaderRowsChange(event) {
    const { value, type, onChange } = this.props
    console.log(event.target.value)
    onChange(
      PatchEvent.from(
        setIfMissing({_type: type.name}),
        set(true || '', ['rows', 1, 'heading'])
      )
    )
  } */

  handleAddRow() {
    const { value, type, onChange } = this.props
    const options = type.options
    const rows = value.rows
    const numCols = rows[0] ? rows[0].columns.length : options.defaultNumColumns || defaultNumColumns
    const cols = []
    for (let i = 0; i < numCols; i++) {
      cols.push(options.defaultValue || '')
    }

    onChange(
        setIfMissing({_type: type.name}),
        insert([{columns: cols}], 'after', ['rows', -1])
    )
  }

  handleRemoveRow() {
    const {value, type, onChange} = this.props
    const rows = value.rows
    if (!rows.length) {
      return
    }

    onChange(setIfMissing({_type: type.name}), unset(['rows', grid.length - 1]))
  }

  handleAddColumn() {
    const { value, type, onChange } = this.props
    const options = type.options
    const rows = value.rows
    const insertOps = rows.map((row, i) =>
      insert([options.defaultValue || ''], 'after', ['rows', i, 'columns', -1])
    )

    onChange([setIfMissing({_type: type.name})].concat(insertOps))
  }

  handleRemoveColumn() {
    const {value, type, onChange} = this.props
    const options = type.options
    const rows = value.rows

    if (!rows[0]) {
      return
    }

    const delColIndex = rows[0].columns.length - 1
    const delOps = rows.map((row, i) => unset(['rows', i, 'columns', delColIndex]))
    onChange([setIfMissing({_type: type.name})].concat(delOps))
  }

  render() {
    const {type, level, onChange} = this.props
    const {dataSheet} = this.state
    const value = this.props.value || {}

    console.log(value)
    return (
      <div>
        <div>
          <h3>{type.title}</h3>
          {type.description && <p>{type.description}</p>}
        </div>
        <div style={{marginBottom: '1rem' }}>
          <label htmlFor="title">Table title</label>
          <br />
          <input
            className={styles.funkyTable}
            name="title"
            type="text"
            onChange={this.handleTitleChange}
            value={value.title || ''}
          />
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="display">Display type</label>
            <DefaultSelect
              name='display'
              items={[
                { title: 'Table', value: 'table' },
                { title: 'Line', value: 'line' },
                { title: 'Bar', value: 'bar' },
              ]}
              onChange={this.handleDisplayChange}
              value={{title: value.display, value: 2 } || { title: 'Table', value: 'table' }}
            />

        </div>

          {!dataSheet && <button onClick={this.handleInitializeTable}>Initialize table</button>}
        </div>

        {dataSheet && (
          <div style={{marginBottom: '1rem' }}>
            <div>
              <button onClick={this.handleAddColumn}>Add column</button>{' '}
              <button onClick={this.handleRemoveColumn}>Delete column</button>
   {/*            <label htmlFor="headerRows"># header rows
                <input onChange={this.handleHeaderRowsChange} name="headerRows" type="number" />
              </label> */}
            </div>

            <ReactDataSheet
              className={styles['data-grid']}
              data={this.state.dataSheet}
              valueRenderer={cell => cell}
              onChange={this.handleTableChange}
            />

            <div>
              <button onClick={this.handleAddRow}>Add row</button>{' '}
              <button onClick={this.handleRemoveRow}>Delete row</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
