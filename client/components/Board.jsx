import React, {Component} from 'react'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      xy: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  createBoard() {
    let arr = []
    
    for (let i = 0; i < this.state.xy; i++) {
      let temp = []
      for (let j = 0; j < this.state.xy; j++) {
        temp.push(0)
      }
      arr.push(temp)
    }
    this.setState({board: arr})
  }

  render() {
    return  (
      <div className='mainTitle'>
        <h1>Hello World</h1>
        <input
          type='text'
          name='xy'
          placeholder='100-500'
          onChange={this.handleChange}
          value={this.state.xy}
        />
        <button onClick={this.createBoard}>Lets Play</button>
      </div>
    )
  }
}

export default Board