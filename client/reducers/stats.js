import {UPDATE_BOARD} from '../actions/updateBoard'
import {statsChecker} from '../../lib/statsChecker'


const stats = ( stats = {}, action) => {
  switch (action.type) {

    case UPDATE_BOARD:
    return statsChecker(action.payload)

    default:
      return stats
  }
}

export default stats