export const UPDATE_LIFE = 'UPDATE_LIFE'
export const CREATE_LIFE = 'CREATE_LIFE'
export const FADE_LIFE = 'FADE_LIFE'

import {newLife} from '../../lib/newLife'
import {fade} from '../../lib/fade'

export const updateLife = payload => { // refactor
  payload = newLife(
    payload.lifeA, payload.lifeB,
    payload.rules, payload.gen, payload.eon
  )
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

export const fadeLife = payload => {
  payload = fade(
    payload.lifeA, payload.lifeB,
    payload.boo, payload.rules, payload.func
  )
  return {
    type: FADE_LIFE,
    payload
  }
}