export const UPDATE_BOARD = 'UPDATE_BOARD'
export const CREATE_BOARD = 'CREATE_BOARD'

import {newBoard} from '../../lib/newBoard'

export const updateBoard = (payload) => { // refactor
  payload = newBoard(payload.board, payload.rules)
  return {
    type: UPDATE_BOARD,
    payload
  }
}

export const createBoard = payload => {
  return {
    type: CREATE_BOARD,
    payload
  }
}