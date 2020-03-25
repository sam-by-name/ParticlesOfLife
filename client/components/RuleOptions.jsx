import React, {Component} from 'react'

import Title from './Title'
import {ruleOpsTitle} from '../../lib/titleArrs'
import {arr} from '../../lib/title'
import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

class RuleOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fade: false,
      fadeIn: false
    }
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

  fadeIn = () => {
    this.setState({fadeIn: true})
  }

  render() {
    let op = this.props.lifeOps
    return (
      <div className={!this.props.fade ? 'fadeOut' : 'fadeIn'}>
        <div className='ruleDiv'>
          <Title 
            size={6}
            length={83}
            class={'menuTitle'}
            title={ruleOpsTitle}
            titleArr={arr(ruleOpsTitle)}
            func={this.fadeIn}
            boo={true}
          />
          <div className={this.state.fadeIn ? 'fadeIn' : 'fadeOut'}>
            <label className='opsLbl' >normal 
              <input type='radio' name='lifeOps' value='0' onChange={this.ruleFade}/>
            </label>
            <label className='opsLbl' >evolve
              <input type='radio' name='lifeOps' value='1' onChange={this.ruleFade}/>
            </label>
            <label className='opsLbl' >move
              <input type='radio' name='lifeOps' value='2' onChange={this.ruleFade}/>
            </label>
            <label className='opsLbl' >rounded
              <input type='radio' name='lifeOps' value='3' onChange={this.ruleFade}/>
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
              <button className='menuBtn'
                onClick={this.props.handleClick}>
                  Lets Play
              </button>
          </span>          
        </div>
      </div>
    )

  }
}

export default RuleOptions