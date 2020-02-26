import React, {Fragment} from 'react'

import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

const RuleOptions = (props) => {

  return (
    <div className='ruleDiv'>
      <h3>Life's Parameters</h3>  

      <input
        className='menuInput'
        type='text'
        name='xy'
        placeholder='10-50'
        onChange={props.handleChange}
        value={props.xy}
      />

      <div className='lifeOps'>
        <label>normal 
          <input type='radio' name='lifeOps' value='0' onChange={props.handleChange}/>
        </label>
        <label>evolve
          <input type='radio' name='lifeOps' value='1' onChange={props.handleChange}/>
        </label>
        <label>move
          <input type='radio' name='lifeOps' value='2' onChange={props.handleChange}/>
        </label>
      </div>

      {props.lifeOps > -1 ? 
        <div className='ruleInfo'>
          <h3>{lifeOpsTxt[props.lifeOps][0]}</h3>
            {lifeOpsTxt[props.lifeOps][1].map(line => {
              return [
                <p key={line.length}>{line}</p> // this key is not great me thinks
              ]
            })}       
        </div>
      : <h3>Please select a rule set</h3>}
    </div>
  )
}

export default RuleOptions