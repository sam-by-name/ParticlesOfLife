import {UPDATE_LIFE} from '../actions/updateLife'
import {CLEAR} from '../actions/lifeActions'

const raf = (raf = 0, action) => {
  switch (action.type) {

    case UPDATE_LIFE:
      return action.payload.raf

    case CLEAR:
      return raf = 0

      default:
        return raf
  }
}

export default raf
