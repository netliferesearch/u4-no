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
      grid: data
    }
    autobind(this)
  }
  /* [
				[{value:  1}, {value:  3},{value:  3}],
				[{value:  2}, {value:  4},{value:  3}],
				[{value:  2}, {value:  4},{value:  3}],
				[{value:  2}, {value:  4},{value:  3}]
      ]
       */
  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    const { type, value: sanityData, level, onChange } = this.props
    return (
      <div>
        <h3>{type.title}</h3>
        {type.description && <p>{type.description}</p>}
        <ReactDataSheet
          className={styles['data-grid']}
          data={convertToDataSheet(this.state.grid)}
          valueRenderer={(cell) => cell.value}
          onChange={async (cell, rowI, colJ, value) => {
            this.setState({ grid: this.state.grid.map((col) => col.map((rowCell) => (rowCell == cell) ? ({value: value}) : rowCell)) })
        onChange(createPatchFrom({grid: convertFromDataSheet(this.state.grid.map((col) => col.map((rowCell) => (rowCell == cell) ? ({value: value}) : rowCell)))}))
            /* this.setState({
              grid: d.map((col) =>
                col.map((rowCell) =>
                  (rowCell == cell) ? ({value: value}) : rowCell
                )
              )
            }) */

            /* console.log(cell, rowI, colJ, value)
            const prepareData = convertToDataSheet(data)
            const grid = prepareData.map((col) => {
              return col.map((rowCell) => {
                console.log(rowCell, cell)
                return (rowCell !== value) ? ({value: value}) : rowCell
              })
            })
            console.log('newGrid', grid)
            this.setState({ grid: convertFromDataSheet(grid) })
            onChange(createPatchFrom({grid: convertFromDataSheet(grid)})) */

          }}
        />
      </div>
    )
  }
}


/* onChange={(cell, rowI, colJ, value) => {
  this.updateDocs({cell, rowI, colJ, value})
}} */
