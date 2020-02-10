import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateBoard} from '../actions/updateBoard'
import {updateXy} from '../actions/updateXy'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.editFirstGen = this.editFirstGen.bind(this)
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
          alive: 0,
          color: 'black',
          key: `${i}${j}`
        })
      }
      arr.push(temp)
    }
    this.editFirstGen(arr)
    this.props.updateXy(this.state.xy)
    this.props.updateBoard(arr)
  }

  editFirstGen (arr) {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (i === 1 && j === 2) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
        else if (i === 2 && j === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
        else if (i === 3) (arr[i][j].alive = 1) && (arr[i][j].color = 'white')
      }
    }
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

const mapDispatchToProps = {
  updateBoard: arr => updateBoard(arr),
  updateXy: num => updateXy(num)
}

export default connect(null, mapDispatchToProps)(Menu)
