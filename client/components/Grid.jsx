import React, {Fragment} from 'react'
import {connect} from 'react-redux'

const Grid = (props) => {
  return (
    <Fragment>
      {props.lifeA.map(row => {
            return [
              <div className='row' key={row[0].key}>
                {row.map(cell => {
                  return [
                    <div style={{backgroundColor: cell.bG ? cell.bG : cell.color,
                                 borderRadius: cell.alive ? cell.radius : '0',
                                 height: '8px', width: '8px'}} key={cell.key}>
                    {/* <div style={{backgroundColor: cell.color, height: '8px', width: '8px'}}
                      key={cell.key}></div> */}
                      {(cell.bG) && 
                        <div style={{backgroundColor: 'black',
                                     borderRadius: cell.radius,
                                     height: '8px', width: '8px'}}>
                        </div>
                      }
                    </div>
                  ]
                })}
              </div>
            ]
          })}
    </Fragment>
  )
}
const mapStateToProps = state => {
  return {
    lifeA: state.life.lifeA
  }
}


export default connect(mapStateToProps)(Grid)
