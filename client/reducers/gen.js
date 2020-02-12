import {UPDATE_GEN} from '../actions/updateGen'

const gen = (gen = 0, action) => {
  switch (action.type) {
    case UPDATE_GEN:
      return gen + 1

      default:
        return gen
  }
}

export default gen
