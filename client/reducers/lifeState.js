import {START_LIFE, STOP_LIFE} from '../actions/lifeActions'

// const firstState = {
//   isLife: false,
//   timer: null
// }

const lifeState = (state = false, action) => {
  switch (action.type) {

    case START_LIFE:
      return true

    case STOP_LIFE:
      return false

    default:
      return state
  }
}

export default lifeState