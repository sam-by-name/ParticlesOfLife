import {UPDATE_LIFE, CREATE_LIFE} from '../actions/updateLife'
import {createLife} from '../../lib/newLife'
import {CLEAR} from '../actions/lifeActions'

const life = (life = [], action) => {
  switch (action.type) {

    case CREATE_LIFE:
      return createLife(action.payload, true)

    case UPDATE_LIFE:
      return action.payload.newArr

    case CLEAR:
      return createLife(action.payload, false)

    default:
      return life
  }
}

export default life