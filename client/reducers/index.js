import {combineReducers} from 'redux'

import board from './board'
import xy from './xy'
import gen from './gen'
import lifeState from './lifeState'
import stats from './stats'

export default combineReducers({
  board,
  xy,
  gen,
  lifeState,
  stats
})