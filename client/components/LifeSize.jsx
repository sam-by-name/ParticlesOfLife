import React, {Fragment} from 'react'

const LifeSize = (props) => {

  return (
    <Fragment>
      <h3>Life's will need a size</h3>  

      <input
        className='menuInput'
        type='text'
        name='xy'
        placeholder='10-50'
        onChange={props.handleChange}
        value={props.xy}
      />

    </Fragment>
  )
}

export default LifeSize