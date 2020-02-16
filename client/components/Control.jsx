import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard, createBoard} from '../actions/updateBoard'
import {startLife, stopLife, clear} from '../actions/lifeActions'

class Control extends Component {
  componentDidMount() {
    this.life(true)
  }

  life = (boo) => {
    if (boo) {
      let timer = setInterval(() => {
        this.props.updateBoard(this.props.board)
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
    // clearInterval(this.props.lifeState.timer)
    // this.props.stopLife()
    this.props.createBoard(this.props.xy)
  }


  render() {
    return ( 
      <div> 
        <h1>{this.props.gen}</h1>
        <button onClick={() => this.life(true)}>Play</button>
        <button onClick={() => this.life(false)}>Pause</button>
        <button onClick={() => this.props.updateBoard(this.props.board)}>nextGen</button>
        <button onClick={this.randomize}>Randomize</button>
        <button onClick={this.clearLife}>Clear</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    gen: state.gen,
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

        