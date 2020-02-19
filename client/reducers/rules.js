import {LIFE_RULES} from '../actions/lifeRules'

const rules = (rules = 0, action) => {
  switch (action.type) {

    case LIFE_RULES:
      return action.payload

    default:
      return rules
  }
}

export default rules