import React, {Component} from 'react'

import Title from './Title'
import {lifeSizeTitle, arr} from '../../lib/title'

class LifeSize extends Component{
  constructor (props) {
    super(props)
    this.state = {
      boo: true,
      fadeIn: false
    }
  }

  componentDidMount() {
    
  }

  fadeIn = () => {
    this.setState({fadeIn: true})
  }

  render() {
    let x = this.state.title
    return (
      <div className={this.props.fade ? 'fadeOut' : 'fadeIn'}>
        <div className='lifeSizeDiv'>
          <Title 
            size={4}
            length={92}
            class={'menuTitle'}
            title={lifeSizeTitle}
            titleArr={arr(lifeSizeTitle)}
            func={this.fadeIn}
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