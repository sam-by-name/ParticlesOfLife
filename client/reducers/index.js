import {combineReducers} from 'redux'

import board from './board'
import xy from './xy'
import gen from './gen'

export default combineReducers({
  board,
  xy,
  gen
})