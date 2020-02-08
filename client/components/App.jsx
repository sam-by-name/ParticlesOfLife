import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Board from './Board'

class App extends Component {
  constructor() {
    super()
    this.state = {
      // board: [],
      boardShow: [],
      xy: 0,
      count: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.lifeBegins = this.lifeBegins.bind(this)
    this.scanner = this.scanner.bind(this)
    this.countSurrounds = this.countSurrounds.bind(this)
    this.lifeOrDeath = this.lifeOrDeath.bind(this)
    this.createSurArr = this.createSurArr.bind(this)
    this.editFirstGen = this.editFirstGen.bind(this)
  }

  handleClick (arr, xy) {
    arr = this.editFirstGen(arr)
    this.setState({
      // board: arr,
      boardShow: arr,
      xy: xy - 1 // does this need to be -1 ?
    })
    // setTimeout(() => {
      this.lifeBegins()
    // }, 1000)
  }

  lifeBegins () {
    this.scanner()
  }

  editFirstGen (arr) {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (i === 1 && j === 2) (arr[i][j].alive = true) && (arr[i][j].color = 'white')
        else if (i === 2 && j === 3) (arr[i][j].alive = true) && (arr[i][j].color = 'white')
        else if (i === 3) (arr[i][j].alive = true) && (arr[i][j].color = 'white')
      }
    }
    return arr
  }

  scanner () {
    let newArr = this.state.boardShow
    let gens = 10000 // make num of generations dynamic
    for (let i = 0; i < gens; i++) {
      for (let x = 0; x < this.state.xy; x++) {
        for (let y = 0; y < this.state.xy; y++) {
          this.countSurrounds(x, y, newArr)
        }
      }
      setTimeout(() => { // not sure I like this
        this.setState({boardShow: newArr, count: i})
      }, 5000)
    } 
  }

  countSurrounds (x, y, newArr) { // needs a refactor
    let arr = this.state.boardShow // deep clone?
    let surArr = this.createSurArr(x, y, arr)
    // let tLC = [arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]]
    // let top = [arr[x][y - 1], arr[x][y + 1], arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]]
    // let tRC = [arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]]
    // let lft = [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1], arr[x + 1][y], arr[x + 1][y + 1]]
    // let rgt = [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1], arr[x + 1][y - 1], arr[x + 1][y]]
    // let bLC = [arr[x - 1][y], arr[x - 1][y + 1], arr[x][y + 1]]
    // let bot = [arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1], arr[x][y - 1], arr[x][y + 1]]
    // let bRC = [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1]]
    // let surArr = [
    //   arr[x - 1][y - 1], arr[x - 1][y], arr[x - 1][y + 1],
    //   arr[x][y - 1], arr[x][y + 1],
    //   arr[x + 1][y - 1], arr[x + 1][y], arr[x + 1][y + 1]
    // ]
    let surrounds = surArr.filter((s) => {return s.alive}).length // does this work?
    this.lifeOrDeath(x, y, surrounds, arr, newArr)
  }

  createSurArr (x, y, arr) { // find a better way
    let max = this.state.xy
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

  lifeOrDeath (x, y, surrounds, arr, newArr) {
    let cell = arr[x][y].alive
    let newCell = newArr[x][y]
    if (!cell && surrounds === 3) (newCell.alive = true) && (newCell.color = 'white')
    else if (surrounds < 2 || surrounds > 3) (newCell.alive = false) && (newCell.color = 'black')
    else if (cell && surrounds === (2 || 3)) (newCell.alive = true) && (newCell.color = 'white')
  }

  render() {
    return (
      <Router>
        <Route path='/menu' render={() => 
          <Menu handleClick={this.handleClick} />}
        />
        <Route path='/board' render={() => 
          <Board board={this.state.boardShow} count={this.state.count} />} 
        />
      </Router>
    )
  }
}

export default App