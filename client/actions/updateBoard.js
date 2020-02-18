export const UPDATE_BOARD = 'UPDATE_BOARD'
export const CREATE_BOARD = 'CREATE_BOARD'

import {newBoard} from '../../lib/newBoard'

export const updateBoard = payload => {
  payload = newBoard(payload)
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