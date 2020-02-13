export const START_LIFE = 'START_LIFE'
export const STOP_LIFE = 'STOP_LIFE'
export const CLEAR_LIFE = 'CLEAR_LIFE'

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

export const clearLife = () => {
  return {
    type: CLEAR_LIFE
  }
}