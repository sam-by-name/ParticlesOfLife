import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Board from './Board'

class App extends Component {
  constructor() {
    super()
    this.state = {
      board: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (arr) {
    this.setState({board: arr})
  }

  render() {
    return (
      <Router>
        <Route path='/menu' render={() => 
          <Menu handleClick={this.handleClick} />}
        />
        <Route path='/board' component={Board} />
      </Router>
    )
  }
}

export default App