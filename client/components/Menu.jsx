import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Title from './Title'
import LifeSize from './LifeSize'
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
      <div className='menuCont' >
        <div className='menuDiv' >
          <div className='ruleDiv'>
            <Title />
            <LifeSize
              handleChange={this.handleChange}
              xy={this.state.xy}
            />
            <RuleOptions
              lifeOps={this.state.lifeOps}
              handleChange={this.handleChange}
              xy={this.state.xy}
            />
            <Link to='/board'>
              <button className='menuBtn'
                onClick={this.handleClick}>
                  Lets Play
              </button>
            </Link>
          </div>
        </div>
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
