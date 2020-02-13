export const UPDATE_BOARD = 'UPDATE_BOARD'
export const PAUSE_BOARD = 'PAUSE_BOARD'
export const RANDOMIZE_BOARD = 'RANDOMIZE_BOARD'
export const CREATE_BOARD = 'CREATE_BOARD'

export const updateBoard = () => {
  return {
    type: UPDATE_BOARD
  }
}
export const pauseBoard = () => {
  return {
    type: PAUSE_BOARD
  }
}

export const randomizeBoard = () => {
  return {
    type: RANDOMIZE_BOARD
  }
}

export const createBoard = payload => {
  return {
    type: CREATE_BOARD,
    payload
  }
}