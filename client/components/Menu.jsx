import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: ''
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
        temp.push({
          alive: false,
          color: this.alive ? 'white' : 'black',
          key: `${i}${j}`
        })
      }
      arr.push(temp)
    }
    this.props.handleClick(arr)
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
        <Link to='/board'>
          <button onClick={this.createBoard}>Lets Play</button>
        </Link>
      </div>
    )
  }
}

export default Menu