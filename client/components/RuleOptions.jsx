import React, {Fragment} from 'react'

import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

const RuleOptions = (props) => {

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default RuleOptions