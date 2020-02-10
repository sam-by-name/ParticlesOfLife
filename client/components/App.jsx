import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Board from './Board'

const App = () => {
  return (
    <Router>
      <Route path='/menu' component={Menu} />
      <Route path='/board' component={Board} />
    </Router>
  )
}

export default App