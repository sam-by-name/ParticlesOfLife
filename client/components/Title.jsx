import React from 'react'

const Title = (props) => {
  return (
    <div className='menuTitle'>
      <span className={props.title < 2 ? 'fadeOut' : 'fadeIn'}>
        <h1>Particles of Life</h1>
      </span>
    </div>
  )
}

export default Title