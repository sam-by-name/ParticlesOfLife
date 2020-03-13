import React from 'react'
import {connect} from 'react-redux'

import Control from './Control'
import Stats from './Stats'
import Grid from './Grid'

const Life = (props) => {
  return (
    <div className='lifeCont'>
      <div className='lifeDiv'>
        <div className='life' style={{width: 8 * props.xy}}>
          <Grid />
        </div>
        <Control/>
        <Stats/>
      </div>
    </div>
  )
} 

const mapStateToProps = state => {
  return {
    xy: state.xy
  }
}


export default connect(mapStateToProps)(Life)
