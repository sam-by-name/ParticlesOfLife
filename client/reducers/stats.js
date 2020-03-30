import {UPDATE_LIFE} from '../actions/updateLife'
import {CLEAR} from '../actions/lifeActions'
import {statsChecker} from '../../lib/statsChecker'


const stats = (stats = {gen: 1}, action) => {
  switch (action.type) {

    case UPDATE_LIFE:
    return statsChecker(action.payload)

    case CLEAR:
      return {
        gen: 0, numBorn: 0,
        numEra: 0, numEon: 0
      }

    default:
      return stats
  }
}

export default stats