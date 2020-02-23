import React, {Fragment} from 'react'

import {lifeOpsTxt} from '../../lib/lifeOpsTxt'

const RuleOptions = (props) => {

  return (
    <Fragment>
      {props.lifeOps > -1 ? 
        <div>
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