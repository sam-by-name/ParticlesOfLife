import React, {Component} from 'react'
import {connect} from 'react-redux'
import RangeSlider from './RangeSlider'

import {updateLife, createLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {fadeLife} from '../actions/updateLife'
import {createLife as create} from '../../lib/newLife'
import {opacity} from '../../lib/fade'

class Control extends Component {
  constructor(props) {
    super(props)
    this.state = {
      int: 1000 / 1,
      fps: 1
    }
    this.raf = 0
  }
  componentDidMount() {
    this.gradualLife(true)
    this.startLife()
  }

  gradualLife = (boo) => { //num, inc) => {
    let s = this.state
      let num
      if (s.fps < 10 && boo) {
        num = s.fps + 1
        setTimeout(() => {
          this.handleChange(num)
          this.gradualLife(num === 10 ? false : true)
        }, 1000)
      } else if (s.fps > 6 && !boo) {
        num = s.fps - 1
        if (num === 1) boo = true
        setTimeout(() => {
          this.handleChange(num)
          this.gradualLife(boo)
        }, 1000)
      }

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

  clearLife = (boo) => {
    if (this.props.lifeState) this.pause() // is running
    this.props.gridSwap(0)
    let {lifeA, lifeB} = opacity(this.props.lifeA, this.props.lifeB)
    this.props.fadeLife({lifeA, lifeB})
    this.props.fade(false, boo ? this.createLife : this.clear)
  }

  clear = time => {
    setTimeout(() => {
      this.props.clear({
        x: this.props.x,
        y: this.props.y
      })
      this.props.gridSwap(0)
    }, time)
  }

  randomize = () => {
    let p = this.props
    if (!p.lifeState && p.gen) { // is paused and has a board
      this.clearLife(true)
    } else if (!p.gen) {         // is paused and no board
      p.gridSwap(0)
      this.createLife(50)
    } else {
      p.updateLife({
        lifeA: create(p.x, p.y, true),
        lifeB: create(p.x, p.y, false),
        rules: p.rules,
        gen: 0,
        eon: []
      })
    }
  }

  createLife = (time) => {
    let p = this.props
    setTimeout(() => {
      this.props.createLife({x: p.x, y: p.y, rules: p.rules})
      p.fade(true, p.gridSwap)
    }, time)
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

  handleChange = fps => {
    this.setState({
      int: 1000 / fps,
      fps
    })
  }

  render() {
    let x = this.props.lifeState
    return ( 
      <div className='controls'> 
        <div className='slider-horizontal'>
          <RangeSlider
            min={0}
            max={60}
            value={this.state.fps}
            step={1}
            orientation='horizontal'
            onChange={this.handleChange}
          />
          <div style={{color: 'red', textAlign: 'center'}}className='value'>{this.state.fps}</div>
        </div>
        <button className='ctrlBtn' onClick={x ? this.pause : this.startLife}>
          {x ? 'Pause' : 'Play'}
        </button>
        <button className='ctrlBtn' onClick={this.next}>nextGen</button>
        <button className='ctrlBtn' onClick={this.randomize}>Randomize</button>
        {this.props.gen && <button className='ctrlBtn' onClick={() => this.clearLife(false)}>Clear</button>}
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
  createLife: obj => createLife(obj),
  stopLife: () => stopLife(),
  clear: num => clear(num),
  fadeLife: obj => fadeLife(obj)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        