import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Menu from './Menu'
import Board from './Board'
import Control from './Control'
import Stats from './Stats'

const App = () => {
  return (
    <Router>
      <Route path='/menu' component={Menu} />
      <div className='boardCont'>
      <Route path='/board' component={Board} />
      <Route path='/board' component={Control} />
      <Route path='/board' component={Stats} />
      </div>
    </Router>
  )
}

export default App