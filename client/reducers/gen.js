import {UPDATE_LIFE} from '../actions/updateLife'
import {CLEAR} from '../actions/lifeActions'

const gen = (gen = 0, action) => {
  switch (action.type) {

    case UPDATE_LIFE:
      return gen + 1

    case CLEAR:
      return gen = 0

      default:
        return gen
  }
}

export default gen
