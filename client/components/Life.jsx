import React, {Component} from 'react'
import {connect} from 'react-redux'

import Control from './Control'
import Stats from './Stats'
import Grid from './Grid'
import GridFade from './GridFade'
import {fadeLife} from '../actions/updateLife'
import {fade} from '../../lib/fade'

class Life extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: /Mobi|Android/i.test(navigator.userAgent),
      portrait: false,
      cell: 5,
      transform: 0,
      fade: true,
      load: true
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
    this.updateWindowDimensions()
    this.fade(true, this.gridSwap)
  }
  
  fade = (boo, func) => {
    setTimeout(() => {
      this.props.fadeLife(fade(
        this.props.lifeA,
        this.props.lifeB,
        boo,
        this.props.rules,
        func
      ))
    }, 500)
  }

  gridSwap = time => {
    setTimeout(() => {
      this.setState({
        fade: !this.state.fade,
        load: false
      })
    }, time)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    let cell, portrait, transform = false
    let p = this.props
    let iW = window.innerWidth
    let iH = window.innerHeight - (window.innerHeight * (20 / 100))
  
    portrait = iH > iW ? true : false

    if (portrait && (p.x < p.y)) transform = true
    else if (!portrait && (p.x > p.y)) transform = true // what if board is square?
    let x = p.x > p.y ? p.x : p.y // x = the larger length of the board
    let sml = iW < iH ? iW : iH // sml = the smaller length of the window
    cell = sml / x
    // based off of ratio of screen and ratio of the board?
    
    // if (this.state.mobile) { // think there are some problems here
    //   if (p.x > p.y && portrait) {         // board is taller than wide, window is portrait
    //     width = window.innerWidth
    //     cell = width / p.y
    //   } else if (p.x < p.y && portrait) {  // board is wider than tall, window is portrait
    //     width = (window.innerHeight / 4) * 3
    //     cell = width / p.x
    //   } else if (p.x > p.y && !portrait) { // board is taller than wide, window is landscape
    //     width = window.innerHeight
    //     cell = width / p.y
    //   } else if (p.x < p.y && !portrait) { // board is wider than tall, window is landscape
    //     width = window.innerWidth
    //     cell = width / p.x
    //   }
    // }
    this.setState({
      portrait,
      cell,
      transform: transform ? 90 : 0
    })
  }

  render() {
    return (
      <div className='lifeCont'>
        <div className='lifeDiv'>
          <div className='life' style={{
            transform: `rotate(${this.state.transform}deg)`
          }}>
            {this.state.fade 
              ? <GridFade cell={this.state.cell}/>
              : <Grid cell={this.state.cell}/>}
          </div>
        </div>
          {!this.state.load &&
            <Control 
              gridSwap={this.gridSwap}
              fade={this.fade}
          />}
          {!this.state.load && <Stats/>}
      </div>
    )

  }
} 

const mapStateToProps = state => {
  return {
    x: state.xy.x,
    y: state.xy.y,
    lifeA: state.life.lifeA,
    lifeB: state.life.lifeB,
    rules: state.rules
  }
}

const mapDispatchToProps = {
  fadeLife: obj => fadeLife(obj)
}

export default connect(mapStateToProps, mapDispatchToProps)(Life)