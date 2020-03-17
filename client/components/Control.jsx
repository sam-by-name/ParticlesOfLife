import React, {Component} from 'react'
import {connect} from 'react-redux'
import Slider from 'react-rangeslider'

import {updateLife, createLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {createLife as create} from '../../lib/newLife'

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
    this.startLife()
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
  
  lifeGo = () => {
    this.raf = setInterval(() => {
      this.next()
    }, this.state.int)
  }

  pause = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.raf)
  }

  clearLife = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.raf)
    this.props.clear({
      x: this.props.x,
      y: this.props.y
    })
  }

  randomize = () => {
    let p = this.props
    p.clear({x: p.x, y: p.y})
    p.updateLife({
      lifeA: create(p.x, p.y, true),
      lifeB: create(p.x, p.y, true),
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

  handleChange = (value) => {
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
        <button className='menuBtn' onClick={x ? this.pause : this.startLife}>
          {x ? 'Pause' : 'Play'}
        </button>
        <button className='menuBtn' onClick={this.next}>nextGen</button>
        <button className='menuBtn' onClick={this.randomize}>Randomize</button>
        <button className='menuBtn' onClick={this.clearLife}>Clear</button>
        <div className='slider-horizontal'>
            <Slider
              min={0}
              max={60}
              value={fps}
              orientation='horizontal'
              onChange={this.handleChange}
            />
            <div style={{color: 'red', textAlign: 'center'}}className='value'>{fps}</div>
        </div>
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
  updateLife: (obj) => updateLife(obj),
  createLife: (num) => createLife(num),
  startLife: (timer) => startLife(timer),
  stopLife: () => stopLife(),
  clear: (num) => clear(num)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        