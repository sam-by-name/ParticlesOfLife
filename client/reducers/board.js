import {UPDATE_BOARD, CREATE_BOARD} from '../actions/updateBoard'
import {createBoard} from '../../lib/newBoard'
import {CLEAR} from '../actions/lifeActions'

const board = (board = [], action) => {
  switch (action.type) {

    case CREATE_BOARD:
      return createBoard(action.payload, true)

    case UPDATE_BOARD:
      return action.payload.newArr

    case CLEAR:
      return createBoard(action.payload, false)

    default:
      return board
  }
}

export default board


// create randomize action to call create and new board
// because randomize button just calls createBoard, which does not self update