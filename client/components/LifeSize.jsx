import React, {Component} from 'react'

import Title from './Title'
import {arr} from '../../lib/title'
import {lifeSizeTitle} from '../../lib/titleArrs'

class LifeSize extends Component{
  constructor (props) {
    super(props)
    this.state = {
      fadeIn: false
    }
  }

  fadeIn = () => {
    this.setState({fadeIn: true})
  }

  render() {
    return (
      <div className={this.props.fade ? 'fadeOut' : 'fadeIn'}>
        <div className='lifeSizeDiv'>
          <Title 
            size={6}
            length={88}
            class={'menuTitle'}
            title={lifeSizeTitle}
            titleArr={arr(lifeSizeTitle)}
            func={this.fadeIn}
            flip={true}
            boo={true}
          />
          <div className={this.state.fadeIn ? 'fadeIn' : 'fadeOut'}>
            <input
              className='menuInput'
              type='text'
              name='x'
              placeholder='10-150'
              onChange={this.props.handleChange}
              value={this.props.x}
            />
            <input
              className='menuInput'
              type='text'
              name='y'
              placeholder='10-150'
              onChange={this.props.handleChange}
              value={this.props.y}
            />
          </div>
          <span className={
            (this.props.x.length && this.props.y.length)
            ? 'fadeIn' : 'fadeOut'
          }>
            <button className='menuBtn' onClick={this.props.lifeSize}>
              Good Choice
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default LifeSize