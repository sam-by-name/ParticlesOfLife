import {UPDATE_XY} from '../actions/updateXy'

const xy = (xy = 0, action) => {
  switch (action.type) {
    
    case UPDATE_XY:
      return {
        x: action.payload.x,
        y: action.payload.y,
        cell: action.payload.cell
      }

    default:
      return xy
  }
}

export default xy