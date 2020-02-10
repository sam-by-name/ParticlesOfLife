import {UPDATE_BOARD} from '../actions/updateBoard'

const board = (board = [], action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload

    default:
      return board
  }
}

export default board