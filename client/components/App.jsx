import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Board from './Board'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hi: true
    }
  }
  render() {
    return (
      <Router>
        <Route path='/menu' component={Menu} />
        <Route path='/board' component={Board} />
      </Router>
    )
  }
}

export default App