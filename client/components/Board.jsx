import React, {Component} from 'react'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      boardSize: 0
    }
    this.createBoard = this.createBoard.bind()
  }
  createBoard(x) {
    let arr = []
    
    for (let i = 0; i < x; i++) {
      let temp = []
      for (let j = 0; j < x; j++) {
        temp.push(0)
      }
      arr.push(temp)
    }
  }

  render() {
    return  (
      <div className='mainTitle'>
        <h1>Hello World</h1>
        <button onClick={() => this.createBoard()}>click me</button>
      </div>
    )
  }
}

export default Board