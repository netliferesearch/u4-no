import FunkyEditor from '../components/FunkyEditor/FunkyEditor'
import {get} from 'lodash'

export default function resolveInput(type) {
  if (type.name === 'array' && type.of.find(ofType => ofType.name === 'block')) {
    return FunkyEditor
  }
  return false
}
