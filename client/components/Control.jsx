import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard, randomizeBoard} from '../actions/updateBoard'
// import {updateGen} from '../actions/updateGen'
import {startLife, stopLife, clear} from '../actions/lifeActions'

class Control extends Component {
  componentDidMount() {
    this.life(true)
  }

  life = (boo) => {
    if (boo) {
      let timer = setInterval(this.props.updateBoard, 100)
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


  render() {
    return ( 
      <div> 
        <h1>{this.props.gen}</h1>
        <button onClick={() => this.life(true)}>Play</button>
        <button onClick={() => this.life(false)}>Pause</button>
        <button onClick={this.props.updateBoard}>nextGen</button>
        <button onClick={this.props.randomizeBoard}>Randomize</button>
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
  updateBoard: () => updateBoard(),
  // updateGen: () => updateGen(),
  randomizeBoard: () => randomizeBoard(),
  startLife: (timer) => startLife(timer), //
  stopLife: () => stopLife(), //
  clear: (num) => clear(num) // 
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        