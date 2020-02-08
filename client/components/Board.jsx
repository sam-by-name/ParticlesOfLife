import React from 'react'
import {connect} from 'react-redux'

import {updateBoard} from '../actions/updateBoard'
import {deepClone} from '../../lib/deepClone'

const Board = (props) => {
  return (
    <div className='board'>
      {/* <h1>{props.count}</h1> */}
      {props.board.map((row) => {
        return [
          <div style={{backgroundColor: row[0].color, height: '4px', width: '4px'}}
          className='row' key={row[0].key}
          >
            {row.map(cell => {
              return [
                <div style={{backgroundColor: cell.color, height: '4px', width: '4px'}}
                className='cell' key={cell.key}
                >
                </div>
              ]
            })}
          </div>

        ]
      })}
      <button onClick={() => scanner(props)}>nextGen</button>
    </div>
  )
} 

const mapStateToProps = state => {
  return {
    board: state.board,
    xy: state.xy
  }
}

const mapDispatchToProps = {
  updateBoard: arr => updateBoard(arr)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)




const scanner = (props) => {
  let newArr = deepClone(props.board)
  // let gens = 10000 // make num of generations dynamic
  // for (let i = 0; i < gens; i++) {
    for (let x = 0; x < props.xy; x++) {
      for (let y = 0; y < props.xy; y++) {
        countSurrounds(props, x, y, props.board, newArr)
      }
    }
    // setTimeout(() => { // find another way
      // this.setState({count: this.state.count++})
      props.updateBoard(newArr)
      // return newArr
    // }, 50)
    // if (this.state.count < 1000) this.scanner()
  // } 
}

const countSurrounds = (props, x, y, arr, newArr) => { // needs a refactor
  let surArr = createSurArr(props, x, y, arr)
  let surrounds = surArr.filter((s) => {return s.alive}).length // does this work?
  lifeOrDeath(x, y, surrounds, arr, newArr)
}

const createSurArr = (props, x, y, arr) => { // find a better way
  let max = props.xy
  if (x < 1 && y < 1) return [arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]] // tLC
  else if (x < 1 && y < max) {
    return [arr[x][y - 1], arr[x][y + 1], arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]] // top
  } else if (x < 1 && y === max) {
    return [arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]] // tRC
  } else if ((x > 0 && x < max) && y < 1) {
    return [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]] // lft
  } else if ((x > 0 && x < max) && y === max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]] // rgt
  } else if (x === max && y < 1) {
    return [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1]] // bLC
  } else if (x === max && y < max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1], arr[x][y - 1], arr[x][y + 1]] // btm
  } else if (x === max && y === max) {
    return [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1]] // bRC
  } else {
    return [ // not edge or corner 
      arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1],
      arr[x][y - 1], arr[x][y + 1],
      arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]
    ]
  }
}

const lifeOrDeath = (x, y, surrounds, arr, newArr) => {
  let cell = arr[x][y].alive
  let newCell = newArr[x][y]
  if (!cell && surrounds === 3) (newCell.alive = true) && (newCell.color = 'white')
  else if (surrounds < 2 || surrounds > 3) (newCell.alive = false) && (newCell.color = 'black')
  else if (cell && surrounds === (2 || 3)) (newCell.alive = true) && (newCell.color = 'white')
}

        