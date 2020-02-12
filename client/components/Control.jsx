import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard, pauseBoard, randomizeBoard} from '../actions/updateBoard'
import {updateGen} from '../actions/updateGen'

class Control extends Component {
  componentDidMount() {
    this.play(true)
  }

  play = (boo) => {
    let int1, int2
    if (boo) {
      setInterval(this.props.updateBoard, 100)
      setInterval(this.props.updateGen, 100)
    } else {

    }
  }

  pauseBoard = () => {
    clearInterval(this.props.updateBoard)
  }

  render() {
    return (
      <div>
        <h1>{this.props.gen}</h1>
        <button onClick={this.pauseBoard}>Pause</button>
        <button onClick={this.props.nextBoard}>nextGen</button>
        <button onClick={this.props.randomizeBoard}>Randomize</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    gen: state.gen
  }
}

const mapDispatchToProps = {
  updateBoard: () => updateBoard(),
  updateGen: () => updateGen(),
  pauseBoard: () => pauseBoard(),
  randomizeBoard: () => randomizeBoard()
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        