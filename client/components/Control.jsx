import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard, createBoard} from '../actions/updateBoard'
import {startLife, stopLife, clear} from '../actions/lifeActions'
import {createBoard as create} from '../../lib/newBoard'

class Control extends Component {
  componentDidMount() {
    this.life(true)
  }

  life = (boo) => {
    if (boo) {
      let timer = setInterval(() => {
        this.props.updateBoard({
          board: this.props.board,
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
    this.props.updateBoard({
      board: create(this.props.xy, true),
      rules: this.props.rules
    }) // I do not like this, can it be refactored?
  }

  next = () => {
    this.props.updateBoard({
      board: this.props.board,
      rules: this.props.rules
    }) // I do not like this, can it be refactored?
  }

  render() {
    return ( 
      <div> 
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
    board: state.board,
    lifeState: state.lifeState,
    xy: state.xy
  }
}

const mapDispatchToProps = {
  updateBoard: (arr) => updateBoard(arr),
  createBoard: (num) => createBoard(num),
  startLife: (timer) => startLife(timer),
  stopLife: () => stopLife(),
  clear: (num) => clear(num)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        