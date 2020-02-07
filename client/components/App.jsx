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
  }

  handleClick (arr, xy) {
    this.setState({
      // board: arr,
      boardShow: arr,
      xy: xy - 1 // does this need to be -1 ?
    })
    this.lifeBegins()
  }

  lifeBegins () {
    this.scanner()
  }

  scanner () {
    let newArr = this.state.showBoard
    let gens = 10000 // make num of generations dynamic
    for (let i = 0; i < gens; i++) {
      for (let x = 0; x < this.state.xy; x++) {
        for (let y = 0; y < this.state.xy; y++) {
          this.countSurrounds(x, y, newArr)
        }
      }
      setTimeout(() => {
        this.setState({showBoard: newArr, count: i})
      }, 500)
    } 
  }

  countSurrounds (x, y, newArr) { // needs a refactor & adapt to not break during fringe cases
    let arr = this.state.showBoard // deep clone?
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
    let surrounds = surArr.reduce((acc, cur) => {if (cur.alive) acc + 1}) // does this work?
    this.lifeOrDeath(x, y, surrounds, arr, newArr)
  }

  createSurArr (x, y, arr) {
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
      return [arr[x - 1][y - 1], arr[x - 1][y], arr[x][y - 1]] // tRC
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
    if (!cell && surrounds === 3) newArr[x][y].alive = true
    else if (surrounds < 2 || surrounds > 3) newArr[x][y].alive = false
    else if (cell && surrounds === (2 || 3)) newArr[x][y].alive = true
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