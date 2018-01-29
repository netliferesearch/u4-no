import FunkyEditor from '../components/FunkyEditor/FunkyEditor'
import FunkyTable from '../components/FunkyTable/FunkyTable'
import {get} from 'lodash'

export default function resolveInput(type) {
  if ((type.title === 'caption text'.toLowerCase()) && type.name === 'array' && type.of.find(ofType => ofType.name === 'block')) {
    return FunkyEditor
  }
  if (type.name === 'funkyTable') {
    return FunkyTable
  }
  return false
}
