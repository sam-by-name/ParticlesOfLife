export const UPDATE_BOARD = 'UPDATE_BOARD'
export const PAUSE_GEN = 'PAUSE_GEN'
export const RANDOMIZE_GEN = 'RANDOMIZE_GEN'

export const updateBoard = () => {
  return {
    type: UPDATE_BOARD
  }
}
export const pauseGen = payload => {
  return {
    type: PAUSE_GEN,
    payload
  }
}

export const randomizeGen = () => {
  return {
    type: RANDOMIZE_GEN
  }
}