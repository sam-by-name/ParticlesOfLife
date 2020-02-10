import {CREATE_BOARD} from '../actions/createBoard'
import {UPDATE_BOARD} from '../actions/updateBoard'
import {newBoard, createBoard} from '../../lib/newBoard'

const board = (board = createBoard(50), action) => {
  switch (action.type) {

    case CREATE_BOARD:
      return createBoard(action.payload)

    case UPDATE_BOARD:
      return newBoard(board)

    default:
      return board
  }
}

export default board