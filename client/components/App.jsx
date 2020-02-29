import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Life from './Life'

const App = () => {
  return (
    <Router>
      <Route path='/menu' component={Menu} />
      <Route path='/life' component={Life} />
    </Router>
  )
}

export default App