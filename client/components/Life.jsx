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
      margin: 'auto',
      winH: '100%',
      winW: '100%',
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

    let margin
    let winH, winW
  
    portrait = iH > iW ? true : false

    if (portrait && (p.x < p.y)) transform = true // if screen is portrait and the game is landscape, rotate the board
    else if (!portrait && (p.x > p.y)) transform = true // if screen is landscape and the game is not, rotate the board. what if board is square?
    
    let x = p.x > p.y ? p.x : p.y // x = the larger length of the board (original)
//
    let y = p.x < p.y ? p.x : p.y // y = the smaller length of the board
//
    let sml = iW < iH ? iW : iH // sml = the smaller length of the window (original)
    // cell = sml / x
    let lgl = iW > iH ? iW: iH // lgl = the larger length of the window
    // cell = lgl / x // cell = sml / x (original)
    let cellA = sml / y
    let cellB = lgl / x
    cell = cellB >= cellA ? cellA : cellB

    if (transform || this.state.transform) margin = `${(iW - (cell * y)) / 2}px auto ${(iW - (cell * y)) / 2}px auto`
    else margin = 'auto'

    if (transform || this.state.transform) {
      winH = cell * y // iW hmmm
      winW = '100%' // cell * x
    } else winW = undefined

    // If using the larger screen dimension, margin is based off of pre-transformed state and so push's away from center.
    // Must find a way to solve this or I cannot allow anthing other than a square ... humph

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
      transform: transform ? 90 : 0, // <<< tidy ^^^
      winH,
      winW,
      margin
    })
  }

  render() {
    return (
      <div className='lifeCont'>
        <div className='lifeDiv'>
          <div className='life' style={{
            transform: `rotate(${this.state.transform}deg)`,
            margin: this.state.margin,
            height: this.state.winH,
            width: this.state.winW
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
          />
        }
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