import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateLife, createLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {createLife as create} from '../../lib/newLife'

class Control extends Component {
  constructor(props) {
    super(props)
    this.raf = 0
  }
  componentDidMount() {
    this.startLife()
  }

  // startLife = () => {
  //   this.props.startLife()
  //   this.life()
  // }

  // life = () => {
  //   this.props.updateLife({
  //     lifeA: this.props.lifeA,
  //     lifeB: this.props.lifeB,
  //     rules: this.props.rules,
  //     raf: requestAnimationFrame(this.life),
  //     gen: this.props.gen,
  //     eon: this.props.eon
  //   }) // I do not like this, can it be refactored?
  // }

  startLife = () => {
    this.props.startLife()

    let then = performance.now()
    let interval = 1000 / 5
    let tolerance = 0.1

    let life = (now) => {
      const delta = now - then
      this.raf = requestAnimationFrame(life)
      
      if (delta >= interval - tolerance) {
        then = now - (delta % interval)
        this.props.updateLife({
          lifeA: this.props.lifeA,
          lifeB: this.props.lifeB,
          rules: this.props.rules,
          gen: this.props.gen,
          eon: this.props.eon //|| []
        }) // I do not like this, can it be refactored?
      }
    }
    this.raf = requestAnimationFrame(life)
  }
  

  pause = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.raf)
  }

  clearLife = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.raf)
    this.props.clear(this.props.xy)
  }

  randomize = () => {
    this.props.clear(this.props.xy)
    this.props.updateLife({
      lifeA: create(this.props.xy || 50, true),
      lifeB: create(this.props.xy || 50, true),
      rules: this.props.rules,
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
    }) // I do not like this, can it be refactored?
  }

  render() {
    let x = this.props.lifeState
    return ( 
      <div className='controls'> 
        <button className='menuBtn' onClick={x ? this.pause : this.startLife}>
          {x ? 'Pause' : 'Play'}
        </button>
        <button className='menuBtn' onClick={this.next}>nextGen</button>
        <button className='menuBtn' onClick={this.randomize}>Randomize</button>
        <button className='menuBtn' onClick={this.clearLife}>Clear</button>
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
    xy: state.xy,
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

        