export const UPDATE_LIFE = 'UPDATE_LIFE'
export const CREATE_LIFE = 'CREATE_LIFE'

import {newLife} from '../../lib/newLife'

export const updateLife = (payload) => { // refactor
  payload = newLife(payload.lifeA, payload.lifeB, payload.rules, payload.raf, payload.gen)
  return {
    type: UPDATE_LIFE,
    payload
  }
}

export const createLife = payload => {
  return {
    type: CREATE_LIFE,
    payload
  }
}