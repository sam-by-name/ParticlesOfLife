import {UPDATE_BOARD, PAUSE_BOARD, RANDOMIZE_BOARD, CREATE_BOARD} from '../actions/updateBoard'
import {newBoard, createBoard, randomizeBoard} from '../../lib/newBoard'
import {CLEAR_LIFE} from '../actions/lifeActions'

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

    case CLEAR_LIFE:
      return createBoard()

    default:
      return board
  }
}

export default board

// MAKE CONTROLS PAUSE, NEXT, PLAY 