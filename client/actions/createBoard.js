export const CREATE_BOARD = 'CREATE_BOARD'

export const createBoard = payload => {
  return {
    type: CREATE_BOARD,
    payload
  }
}