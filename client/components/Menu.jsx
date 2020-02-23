import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import RuleOptions from './RuleOptions'

import {createBoard} from '../actions/updateBoard'
import {updateXy} from '../actions/updateXy'
import {lifeRules} from '../actions/lifeRules'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: '',
      lifeOps: -1
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
    this.props.updateXy(this.state.xy || '50')
    this.props.createBoard(this.state.xy || '50')
    this.props.rules(this.state.lifeOps)
  }

  render() {
    return  (
      <div className='mainTitle'>
        <h1>Particles of Life</h1>
        <input
          type='text'
          name='xy'
          placeholder='10-50'
          onChange={this.handleChange}
          value={this.state.xy}
        />
        <Link to='/board'>
          <button onClick={this.handleClick}>Lets Play</button>
        </Link>

        <div>
          <h3>Life's Options</h3>  
          <div className='lifeOps'>
            <label>normal 
              <input type='radio' name='lifeOps' value='0' onChange={this.handleChange}/>
            </label>
            <label>evolve
              <input type='radio' name='lifeOps' value='1' onChange={this.handleChange}/>
            </label>
            <label>move
              <input type='radio' name='lifeOps' value='2' onChange={this.handleChange}/>
            </label>
          </div>
        </div>
        <RuleOptions lifeOps={this.state.lifeOps} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  createBoard: arr => createBoard(arr),
  updateXy: num => updateXy(num),
  rules: num => lifeRules(num)
}

export default connect(null, mapDispatchToProps)(Menu)
