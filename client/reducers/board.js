import {UPDATE_BOARD, RANDOMIZE_BOARD, CREATE_BOARD} from '../actions/updateBoard'
import {newBoard, createBoard, randomizeBoard} from '../../lib/newBoard'
import {CLEAR} from '../actions/lifeActions'

const board = (board = [], action) => {
  switch (action.type) {

    case CREATE_BOARD:
      return createBoard(action.payload)

    case UPDATE_BOARD:
      return newBoard(board)

    case RANDOMIZE_BOARD:
      return randomizeBoard(board)

    case CLEAR:
      return createBoard(action.payload)

    default:
      return board
  }
}

export default board
