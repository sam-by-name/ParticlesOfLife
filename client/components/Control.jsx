import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard, pauseGen, randomizeGen} from '../actions/updateBoard'
import {updateGen} from '../actions/updateGen'

class Control extends Component {
  componentDidMount() {
    setInterval(this.props.updateBoard, 100)
    setInterval(this.props.updateGen, 100)
  }

  render() {
    return (
      <div>
        <h1>{this.props.gen}</h1>
        <button onclick={this.props.pauseGen}>Pause</button>
        <button onClick={this.props.nextGen}>nextGen</button>
        <button onClick={this.props.randomizeGen}>Randomize</button>
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
  pauseGen: () => pauseGen(),
  randomizeGen: () => randomizeGen()
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        