import React from 'react'
import {connect} from 'react-redux'

import Control from './Control'
import Stats from './Stats'

const Life = (props) => {
  return (
    <div className='lifeCont'>
      <div className='lifeDiv'>
        <div className='life' style={{width: 8 * props.xy}}>
          {props.lifeA.map(row => {
            return [
              <div style={{backgroundColor: row[0].color, height: '8px', width: '8px'}}
                className='row' key={row[0].key}
              >
                {row.map(cell => {
                  return [
                    <div style={{backgroundColor: cell.color, height: '8px', width: '8px'}}
                      className='cell' key={cell.key}
                    >
                    </div>
                  ]
                })}
              </div>
            ]
          })}
        </div>
        <Control/>
        <Stats/>
      </div>
    </div>
  )
} 

const mapStateToProps = state => {
  return {
    lifeA: state.life.lifeA,
    xy: state.xy,
    gen: state.stats.gen
  }
}


export default connect(mapStateToProps)(Life)
