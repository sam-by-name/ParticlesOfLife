import React from 'react'
import {connect} from 'react-redux'

const Stats = (props) => {
  return (
    <div className='stats' >
      <h2>Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Gens</th>
            <th>Born</th>
            <th>Survived</th>
            <th>Evolved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.gen}</td>
            <td>{props.numBorn}</td>
            <td>{props.numEra}</td>
            <td>{props.numEon}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStatToProps = state => {
  return {
    ...state.stats
  }
}

export default connect(mapStatToProps)(Stats)