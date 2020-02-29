import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateLife, createLife} from '../actions/updateLife'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {createLife as create} from '../../lib/newLife'

class Control extends Component {
  componentDidMount() {
    this.life(true)
  }

  life = (boo) => {
    if (boo) {
      let timer = setInterval(() => {
        this.props.updateLife({
          life: this.props.life,
          rules: this.props.rules
        }) // I do not like this, can it be refactored?
      }, 100)
      this.props.startLife(timer)
    } else {
      clearInterval(this.props.lifeState.timer)
      this.props.stopLife()
    }
  }

  clearLife = () => {
    clearInterval(this.props.lifeState.timer)
    this.props.stopLife()
    this.props.clear(this.props.xy)
  }

  randomize = () => {
    this.props.clear(this.props.xy)
    this.props.updateLife({
      life: create(this.props.xy, true),
      rules: this.props.rules
    }) // I do not like this, can it be refactored?
  }

  next = () => {
    this.props.updateLife({
      life: this.props.life,
      rules: this.props.rules
    }) // I do not like this, can it be refactored?
  }

  render() {
    return ( 
      <div className='controls' > 
        <button onClick={() => this.life(true)}>Play</button>
        <button onClick={() => this.life(false)}>Pause</button>
        <button onClick={this.next}>nextGen</button>
        <button onClick={this.randomize}>Randomize</button>
        <button onClick={this.clearLife}>Clear</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rules: state.rules,
    life: state.life,
    lifeState: state.lifeState,
    xy: state.xy
  }
}

const mapDispatchToProps = {
  updateLife: (arr) => updateLife(arr),
  createLife: (num) => createLife(num),
  startLife: (timer) => startLife(timer),
  stopLife: () => stopLife(),
  clear: (num) => clear(num)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        