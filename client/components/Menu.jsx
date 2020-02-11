import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {createBoard} from '../actions/createBoard'
import {updateXy} from '../actions/updateXy'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleClick () {
    this.props.updateXy(this.state.xy)
    this.props.createBoard(this.state.xy)
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
          <button onClick={this.handleClick}>Lets Play</button>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createBoard: arr => createBoard(arr),
  updateXy: num => updateXy(num)
}

export default connect(null, mapDispatchToProps)(Menu)
