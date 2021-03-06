import {combineReducers} from 'redux'

import life from './life'
import xy from './xy'
import lifeState from './lifeState'
import stats from './stats'
import rules from './rules'

export default combineReducers({
  life,
  xy,
  lifeState,
  stats,
  rules
})