import {CREATE_BOARD} from '../actions/createBoard'
import {UPDATE_BOARD, PAUSE_GEN, RANDOMIZE_GEN} from '../actions/updateBoard'
import {newBoard, createBoard, randomizeGen} from '../../lib/newBoard'

const board = (board = [], action) => {
  switch (action.type) {

    case CREATE_BOARD:
      return createBoard(action.payload)

    case UPDATE_BOARD:
      return newBoard(board)

    case RANDOMIZE_GEN:
      return randomizeGen(board)

    default:
      return board
  }
}

export default board

// MAKE CONTROLS PAUSE, NEXT, PLAY AND RANDOMIZE BOARD