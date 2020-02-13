import {UPDATE_BOARD} from '../actions/updateBoard'
import {CLEAR} from '../actions/lifeActions'

const gen = (gen = 0, action) => {
  switch (action.type) {

    case UPDATE_BOARD:
      return gen + 1

    case CLEAR:
      return gen = 0

      default:
        return gen
  }
}

export default gen
