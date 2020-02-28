import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

class RuleOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      temp: 'Life needs some rules'
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

  render() {
    return (
      <div className='ruleDiv' >
        <h3 className='ruleOpsTxt' >{this.state.title}</h3>
          {!this.state.temp.length &&
            <div className='lifeOps'>
              <label>normal 
                <input type='radio' name='lifeOps' value='0' onChange={this.props.handleChange}/>
              </label>
              <label>evolve
                <input type='radio' name='lifeOps' value='1' onChange={this.props.handleChange}/>
              </label>
              <label>move
                <input type='radio' name='lifeOps' value='2' onChange={this.props.handleChange}/>
              </label>
            </div>
          }
          {this.props.lifeOps > -1 && 
            <div className='ruleInfo'>
              <h3>{lifeOpsTxt[this.props.lifeOps][0]}</h3>
                {lifeOpsTxt[this.props.lifeOps][1].map(line => {
                  return [
                    <p key={line.length}>{line}</p> // this key is not great me thinks
                  ]
                })}       
            </div>
          }
          {this.props.lifeOps > -1 &&
            <Link to='/board'>
              <button className='menuBtn'
                onClick={this.props.handleClick}>
                  Lets Play
              </button>
            </Link>
            }
      </div>
    )

  }
}

export default RuleOptions