import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard} from '../actions/updateBoard'
import {updateGen} from '../actions/updateGen'

class Control extends Component {
  componentDidMount() {
    setInterval(this.props.updateBoard, 100)
  }

  render() {
    return (
      <div>
        <h1>{this.props.gen}</h1>
        <button onClick={() => this.props.updateBoard()}>nextGen</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    xy: state.xy,
    gen: state.gen
  }
}

const mapDispatchToProps = {
  updateBoard: arr => updateBoard(arr),
  updateGen: num => updateGen(num)
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        