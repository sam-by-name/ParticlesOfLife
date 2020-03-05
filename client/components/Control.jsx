import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateLife, createLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {createLife as create} from '../../lib/newLife'

class Control extends Component {
  componentDidMount() {
    this.startLife()
  }

  startLife = () => {
    this.props.startLife()
    this.life()
  }

  life = () => {
    this.props.updateLife({
      lifeA: this.props.lifeA,
      lifeB: this.props.lifeB,
      rules: this.props.rules,
      raf: requestAnimationFrame(this.life),
      gen: this.props.gen
    }) // I do not like this, can it be refactored?
  }

  pause = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.props.raf)
  }

  clearLife = () => {
    this.props.stopLife()
    cancelAnimationFrame(this.props.raf)
    this.props.clear(this.props.xy)
  }

  randomize = () => {
    this.props.clear(this.props.xy)
    this.props.updateLife({
      lifeA: create(this.props.xy || 50, true),
      lifeB: create(this.props.xy || 50, true),
      rules: this.props.rules,
      raf: this.props.raf,
      gen: 0
    }) // I do not like this, can it be refactored?
  }

  next = () => {
    this.props.updateLife({
      lifeA: this.props.lifeA,
      lifeB: this.props.lifeB,
      rules: this.props.rules,
      raf: this.props.raf,
      gen: this.props.gen
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
    raf: state.raf,
    gen: state.stats.gen
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

        