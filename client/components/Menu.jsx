import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'

import Title from './Title'
import LifeSize from './LifeSize'
import RuleOptions from './RuleOptions'

import {createLife} from '../actions/updateLife'
import {updateXy} from '../actions/updateXy'
import {lifeRules} from '../actions/lifeRules'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: '',
      lifeOps: -1,
      title: 2,
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
    this.fade()
    setTimeout(() => {
      this.props.updateXy(this.state.xy || '50')
      this.props.rules(this.state.lifeOps)
      this.props.createLife(this.state.xy || '50')
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
    if (this.state.redirect) {return <Navigate to='/life'/>}
    else {
      return (
        <div className='menuCont'>
          <div className='menuDiv'>
              {this.state.title > 0  &&
                <Title
                  title={this.state.title}
                  lifeSize={this.showLifeSize}
                />
              }
              {(this.state.title < 1 && !this.state.xyChosen) &&
                <LifeSize
                  handleChange={this.handleChange}
                  xy={this.state.xy}
                  lifeSize={this.lifeSize}
                  fade={this.state.fade}
                />
              }
              {this.state.xyChosen &&
                <RuleOptions
                  lifeOps={this.state.lifeOps}
                  handleChange={this.handleChange}
                  xy={this.state.xy}
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
