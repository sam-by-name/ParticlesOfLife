import {combineReducers} from 'redux'

import board from './board'
import xy from './xy'

export default combineReducers({
  board,
  xy
})