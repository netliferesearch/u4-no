import React, { Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))



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
    this.state = {
      _type: 'table',
      grid: [
        [{value:  1}, {value:  3},{value:  3}],
        [{value:  2}, {value:  4},{value:  3}],
        [{value:  2}, {value:  4},{value:  3}],
        [{value:  2}, {value:  4},{value:  3}]
      ]
    }
    autobind(this)
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  updateDocs = (cell, rowI, colJ, value) => {
    console.log(cell, rowI, colJ, value)
    this.setState({
      grid: this.state.grid.map((col) =>
      col.map((rowCell) => (rowCell == cell) ? ({value: value}) : rowCell)
      )
    })
    createPatchFrom({_type: 'table', grid: this.state.grid})
  }



  render() {
    const { type, value, level, onChange } = this.props
    return (
      <div>
        <h3>{type.title}</h3>
        {type.description && <p>{type.description}</p>}
        <ReactDataSheet
        data={this.state.grid}
        valueRenderer={(cell) => cell.value}
        onChange={this.updateDocs}
      />
      </div>
    )
  }
}


/* onChange={(cell, rowI, colJ, value) => {
  this.updateDocs({cell, rowI, colJ, value})
}} */
