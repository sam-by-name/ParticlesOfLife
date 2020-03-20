import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Title from './Title'
import LifeSize from './LifeSize'
import RuleOptions from './RuleOptions'

import {createLife} from '../actions/updateLife'
import {updateXy} from '../actions/updateXy'
import {lifeRules} from '../actions/lifeRules'

import {arr} from '../../lib/title'
import {title} from '../../lib/titleArrs'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: '',
      y: '',
      lifeOps: -1,
      title: 2, // 
      xyChosen: false,
      fade: false
    }
  }

  showLifeSize = () => {
    setTimeout(() => {
      this.setState({title: 0})
    }, 500)    
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    let s = this.state
    this.fade()
    setTimeout(() => {
      this.props.updateXy({x: Number(s.x), y: Number(s.y)})
      this.props.rules(s.lifeOps)
      this.props.createLife({x: Number(s.x), y: Number(s.y)})
      this.setState({redirect: true})
    }, 1000)
  }

  lifeSize = () => {
    this.fade()
    setTimeout(() => {
      this.setState({xyChosen: true})
    }, 1000)
  }

  fade = () => {
    this.setState({fade: !this.state.fade})
  }

  render() {
    if (this.state.redirect) {return <Redirect to='/life'/>}
    else {
      return (
        <div className='menuCont'>
          <div className='menuDiv'>
              {this.state.title > 0  &&
                <Title
                  size={6}
                  length={88}
                  class={'menuTitle'}
                  titleArr={arr(title)}
                  title={title}
                  func={this.showLifeSize}
                />
              }
              {(this.state.title < 1 && !this.state.xyChosen) &&
                <LifeSize
                  handleChange={this.handleChange}
                  x={this.state.x}
                  y={this.state.y}
                  lifeSize={this.lifeSize}
                  fade={this.state.fade}
                />
              }
              {this.state.xyChosen &&
                <RuleOptions
                  lifeOps={this.state.lifeOps}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  fade={this.state.fade}
                />
              }
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  createLife: arr => createLife(arr),
  updateXy: num => updateXy(num),
  rules: num => lifeRules(num)
}

export default connect(null, mapDispatchToProps)(Menu)
