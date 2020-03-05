import {UPDATE_LIFE, CREATE_LIFE} from '../actions/updateLife'
import {createLife} from '../../lib/newLife'
import {CLEAR} from '../actions/lifeActions'
let obj = {
  lifeA: [],
  lifEB: []
}

const life = (state = obj, action) => {
  switch (action.type) {

    case CREATE_LIFE:
      return {
        lifeA: createLife(action.payload, true),
        lifeB: createLife(action.payload, false)
      }

    case UPDATE_LIFE:
      return {
        lifeA: action.payload.lifeA,
        lifeB: action.payload.lifeB
      } 

    case CLEAR:
      return {
        lifeA: createLife(action.payload, false),
        lifeB: createLife(action.payload, false)
      }

    default:
      return state
  }
}

export default life