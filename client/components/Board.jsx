import React from 'react'

const Board = (props) => {
  return (
    <div className='board'>
      {props.board.map((row) => {
        return [
          <div style={{backgroundColor: row[0].color, height: '4px', width: '4px'}}
          className='row'
          >
            {row.map(cell => {
              return [
                <div style={{backgroundColor: cell.color, height: '4px', width: '4px'}}
                className='cell'
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

export default Board