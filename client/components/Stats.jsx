import React from 'react'
import {connect} from 'react-redux'

const Stats = (props) => {
  return (
    <div className='stats' >
      <h2>Stats</h2>
      <table>
        <tr>
          <th>Gens</th>
          <th>Born</th>
          <th>Survived</th>
          <th>Evolved</th>
        </tr>
        <tr>
          <td>{props.gen}</td>
          <td>{props.numBorn}</td>
          <td>{props.numEra}</td>
          <td>{props.numEon}</td>
        </tr>
      </table>
    </div>
  )
}

const mapStatToProps = state => {
  return {
    numBorn: state.stats.numBorn,
    numEra: state.stats.numEra,
    numEon: state.stats.numEon,
    gen: state.gen
  }
}

export default connect(mapStatToProps)(Stats)