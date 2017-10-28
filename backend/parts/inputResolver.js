import FunkyEditor from '../components/FunkyEditor/FunkyEditor'
import FunkyTable from '../components/FunkyTable/FunkyTable'
import {get} from 'lodash'

export default function resolveInput(type) {
  if (type.name === 'array' && type.of.find(ofType => ofType.name === 'block')) {
    return FunkyEditor
  }
  if (type.name === 'table') {
    return FunkyTable
  }
  return false
}
