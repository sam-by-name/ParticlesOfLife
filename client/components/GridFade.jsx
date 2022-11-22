import React, {Fragment} from 'react'
import {connect} from 'react-redux'

const GridFade = (props) => {
  return (
    <Fragment>
      {props.lifeA.map(row => {
        return [
          <div className='row' style={{height: `${props.cell}px`, width: `${row.length * props.cell}px`}} key={row[0].key}>
            {row.map(cell => {
              return [
                <div style={{backgroundColor: cell.bG ? cell.bG : cell.color,
                             opacity: cell.opacity,
                             transition: cell.transition,
                             borderRadius: cell.alive ? cell.radius : '0',
                             height: `${props.cell}px`, width: `${props.cell}px`}} key={cell.key}>
                  {cell.bG && 
                    <div style={{backgroundColor: 'black',
                                 borderRadius: cell.radius,
                                 height: `${props.cell}px`, width: `${props.cell}px`}}>
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


export default connect(mapStateToProps)(GridFade)
