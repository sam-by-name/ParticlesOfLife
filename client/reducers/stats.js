import {UPDATE_LIFE} from '../actions/updateLife'
import {statsChecker} from '../../lib/statsChecker'


const stats = (stats = {}, action) => {
  switch (action.type) {

    case UPDATE_LIFE:
    return statsChecker(action.payload)

    default:
      return stats
  }
}

export default stats