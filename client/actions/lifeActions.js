export const START_LIFE = 'START_LIFE'
export const STOP_LIFE = 'STOP_LIFE'
export const CLEAR = 'CLEAR'

export const startLife = (payload) => {
  return {
    type: START_LIFE,
    payload
  }
}

export const stopLife = () => {
  return {
    type: STOP_LIFE
  }
}

export const clear = (payload) => {
  return {
    type: CLEAR,
    payload
  }
}