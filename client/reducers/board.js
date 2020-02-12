import {CREATE_BOARD} from '../actions/createBoard'
import {UPDATE_BOARD, PAUSE_BOARD, RANDOMIZE_BOARD} from '../actions/updateBoard'
import {newBoard, createBoard, randomizeBoard} from '../../lib/newBoard'

const board = (board = [], action) => {
  switch (action.type) {

    case CREATE_BOARD:
      return createBoard(action.payload)

    case UPDATE_BOARD:
      return newBoard(board)

    case RANDOMIZE_BOARD:
      return randomizeBoard(board)

    case PAUSE_BOARD:
      return // !!!!!!!CONTINUE HERE!!!!!!!

    default:
      return board
  }
}

export default board

// MAKE CONTROLS PAUSE, NEXT, PLAY 