import React, {Component} from 'react'
import {connect} from 'react-redux'


import {updateBoard} from '../actions/updateBoard'
import {updateGen} from '../actions/updateGen'

class Control extends Component {
  componentDidMount() {
    setInterval(this.props.updateBoard, 200)
    // setInterval(this.props.updateGen, 100)
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
    gen: state.gen
  }
}

const mapDispatchToProps = {
  updateBoard: () => updateBoard(),
  updateGen: () => updateGen()
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

        