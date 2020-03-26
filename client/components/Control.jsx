import React, {Component} from 'react'
import {connect} from 'react-redux'
import Slider from 'react-rangeslider'

import {updateLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {fadeLife} from '../actions/updateLife'
import {createLife as create} from '../../lib/newLife'
import {fade, opacity} from '../../lib/fade'

class Control extends Component {
  constructor(props) {
    super(props)
    this.state = {
      int: 1000 / 10,
      fps: 10
    }
    this.raf = 0
  }
  componentDidMount() {
    // this.startLife()
    // this.lifeGo()
  }

  startLife = () => {
    this.props.startLife()
    let then = performance.now()

    let life = (now) => {
      const delta = now - then
      this.raf = requestAnimationFrame(life)
      
      if (delta >= this.state.int - 0.1) {
        then = now - (delta % this.state.int)
        this.next()
      }
    }
    this.raf = requestAnimationFrame(life)
  }

  pause = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.raf)
  }

  clearLife = () => {
    this.pause()
    let {lifeA, lifeB} = opacity(this.props.lifeA, this.props.lifeB)
    this.props.fadeLife({lifeA, lifeB})
    this.props.gridSwap(0)
    this.fadeOut(lifeA, lifeB)
  }
  
  fadeOut = (lifeA, lifeB) => {
    setTimeout(() => {
      this.props.fadeLife(fade(
        lifeA,
        lifeB,
        false,
        this.props.rules,
        this.clear
      ))
    }, 500)
  }

  clear = time => {
    setTimeout(() => {
      this.props.clear({
        x: this.props.x,
        y: this.props.y
      })
      this.props.gridSwap(0) //
    }, time)
  }

  randomize = () => {
    let p = this.props
    p.clear({x: p.x, y: p.y})
    p.updateLife({
      lifeA: create(p.x, p.y, true),
      lifeB: create(p.x, p.y, false),
      rules: p.rules,
      gen: 0,
      eon: []
    }) // I do not like this, can it be refactored?
  }

  next = () => {
    this.props.updateLife({
      lifeA: this.props.lifeA,
      lifeB: this.props.lifeB,
      rules: this.props.rules,
      gen: this.props.gen,
      eon: this.props.eon
    })
  }

  handleChange = value => {
    this.setState({
      int: 1000 / value,
      fps: value
    })
  }

  render() {
    let x = this.props.lifeState
    const {fps} = this.state
    return ( 
      <div className='controls'> 
        <div className='slider-horizontal'>
          <Slider
            min={0}
            max={60}
            value={fps}
            orientation='horizontal'
            onChange={this.handleChange}
          />
          {/* <div style={{color: 'red', textAlign: 'center'}}className='value'>{fps}</div> */}
        </div>
        <button className='ctrlBtn' onClick={x ? this.pause : this.startLife}>
          {x ? 'Pause' : 'Play'}
        </button>
        <button className='ctrlBtn' onClick={this.next}>nextGen</button>
        <button className='ctrlBtn' onClick={this.randomize}>Randomize</button>
        <button className='ctrlBtn' onClick={this.clearLife}>Clear</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rules: state.rules,
    lifeA: state.life.lifeA,
    lifeB: state.life.lifeB,
    lifeState: state.lifeState,
    x: state.xy.x,
    y: state.xy.y,
    gen: state.stats.gen,
    eon: state.stats.eonPos
  }
}

const mapDispatchToProps = {
  updateLife: obj => updateLife(obj),
  startLife: timer => startLife(timer),
  stopLife: () => stopLife(),
  clear: num => clear(num),
  fadeLife: obj => fadeLife(obj)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        