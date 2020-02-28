import React from 'react'
import {connect} from 'react-redux'

const Stats = (props) => {
  return (
    <div className='stats' >
      <h1>Stats</h1>
      <h2>No. generations: {props.gen}</h2>
      <h2>No. new born :  {props.numBorn}</h2>
      <h2>No. survivers:  {props.numEra}</h2>
      <h2>No. evolved  :  {props.numEon}</h2>
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