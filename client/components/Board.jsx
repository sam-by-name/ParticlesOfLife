import React from 'react'
import {connect} from 'react-redux'

const Board = (props) => {
  return (
    <div className='board'>
      {props.board.map((row) => {
        return [
          <div style={{backgroundColor: row[0].color, height: '4px', width: '4px'}}
          className='row' key={row[0].key}
          >
            {row.map(cell => {
              return [
                <div style={{backgroundColor: cell.color, height: '4px', width: '4px'}}
                className='cell' key={cell.key}
                >
                </div>
              ]
            })}
          </div>

        ]
      })}
    </div>
  )
} 

const mapStateToProps = state => {
  return {
    board: state.board
  }
}


export default connect(mapStateToProps)(Board)

