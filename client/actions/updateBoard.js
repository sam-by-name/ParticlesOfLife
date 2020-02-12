export const UPDATE_BOARD = 'UPDATE_BOARD'
export const PAUSE_BOARD = 'PAUSE_BOARD'
export const RANDOMIZE_BOARD = 'RANDOMIZE_BOARD'

export const updateBoard = () => {
  return {
    type: UPDATE_BOARD
  }
}
export const pauseBoard = payload => {
  return {
    type: PAUSE_BOARD,
    payload
  }
}

export const randomizeBoard = () => {
  return {
    type: RANDOMIZE_BOARD
  }
}