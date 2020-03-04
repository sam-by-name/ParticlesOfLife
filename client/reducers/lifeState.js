import {START_LIFE, STOP_LIFE} from '../actions/lifeActions'

// const firstState = {
//   isLife: false,
//   timer: null
// }

const lifeState = (state = false, action) => {
  switch (action.type) {

    case START_LIFE:
      return {
        isLife: true
        // timer: action.payload
      }

    case STOP_LIFE:
      return {
        isLife: false
        // timer: null
      }

    default:
      return state
  }
}

export default lifeState