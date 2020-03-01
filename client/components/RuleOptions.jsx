import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

class RuleOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      temp: 'Life needs some rules',
      fade: false
    }
  }

  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.temp.length) {
        let tl = this.state.temp
        let char = tl.charAt(0)
        this.setState({
          title: this.state.title + char,
          temp: tl.slice(1)
        })
      } else clearInterval(timer)
    }, 60)
  }

  ruleFade = (e) => {
    if (this.props.lifeOps < 0) {
    this.props.handleChange(e)
    this.setState({fade: !this.state.fade})
    } else {
      this.setState({fade: !this.state.fade})
      let {name, value} = e.target
      setTimeout(() => {
        this.props.handleChange({target: {name, value}})
        setTimeout(() => {
          this.setState({fade: !this.state.fade})
        }, 500)
      }, 1000)
    }
  }

  render() {
    let op = this.props.lifeOps
    return (
      <div className='ruleDiv'>
        <h3 className='ruleOpsTxt' >{this.state.title}</h3>
          <div className={this.state.temp.length ? 'fadeOut' : 'fadeIn'}>
            <label className='opsLbl' >normal 
              <input type='radio' name='lifeOps' value='0' onChange={this.ruleFade}/>
            </label>
            <label className='opsLbl' >evolve
              <input type='radio' name='lifeOps' value='1' onChange={this.ruleFade}/>
            </label>
            <label className='opsLbl' >move
              <input type='radio' name='lifeOps' value='2' onChange={this.ruleFade}/>
            </label>
          </div>
          <div className={!this.state.fade ? 'fadeOut' : 'fadeIn' }>
            <h3>{lifeOpsTxt[op < 0 ? 0 : op][0]}</h3>
              {lifeOpsTxt[op < 0 ? 0 : op][1].map(line => {
                return [
                  <p key={line.length}>{line}</p> // this key is not great me thinks
                ]
              })}       
          </div>
          <span className={!this.state.fade ? 'fadeOut' : 'startFadeIn' }>
            <Link to='/life'>
              <button className='menuBtn'
                onClick={this.props.handleClick}>
                  Lets Play
              </button>
            </Link>
          </span>          
      </div>
    )

  }
}

export default RuleOptions