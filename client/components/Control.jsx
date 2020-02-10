import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard} from '../actions/updateBoard'
import {updateGen} from '../actions/updateGen'

class Control extends Component {
  componentDidMount() {
    scanner(this.props)
  }

  render() {
    return (
      <div>
        <h1>{this.props.gen}</h1>
        <button onClick={() => scanner(this.props)}>nextGen</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    xy: state.xy,
    gen: state.gen
  }
}

const mapDispatchToProps = {
  updateBoard: arr => updateBoard(arr),
  updateGen: num => updateGen(num)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

const scanner = (props) => {
  let newArr = []
  // let gens = 100 // make num of generations dynamic
  // for (let i = 0; i < gens; i++) {
    // console.log(`Gen ${props.gen}`)
    for (let x = 0; x < props.xy; x++) {
      let row = []
      for (let y = 0; y < props.xy; y++) {
        row.push(countSurrounds(props, x, y, props.board))
      }
      newArr.push(row)
    }
    props.updateBoard(newArr)
    props.updateGen(props.gen + 1)
    // setInterval(() => { // find another way
    //   if (props.gen < 1000) scanner(props)
    // }, 50)
  // } 
}

const countSurrounds = (props, x, y, arr) => {
  let surArr = createSurArr(props, x, y, arr)
  let surrounds = surArr.filter(s => {return s.alive}).length
  return lifeOrDeath(x, y, surrounds, arr)
}

const createSurArr = (props, x, y, arr) => { // find a better way
  let max = props.xy - 1
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

const lifeOrDeath = (x, y, surrounds, arr) => {
  let cell = arr[x][y].alive
  if (cell) {
    if (surrounds < 2 || surrounds > 3) return {alive: 0, color: 'black', key: `${x}${y}`}
    else return {alive: 1, color: 'white', key: `${x}${y}`}
  } 
  if (!cell && surrounds === 3) return {alive: 1, color: 'white', key: `${x}${y}`}
  else return {alive: 0, color: 'black', key: `${x}${y}`}
}

        