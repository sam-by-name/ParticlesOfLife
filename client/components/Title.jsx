import React, {Component} from 'react'

import {title, flicker, arr} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      count: title[0].length * title.length
    }
  }
  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.count) {
        let x = flicker(this.state.title, this.state.count)
        this.setState({
          title: x,
          count: this.state.count - 1
        })
      } else clearInterval(timer)
    }, 18)

  }


  render() {
    return (
      <div className='menuTitle' style={{width: `${title[0].length * 6}px`}}>
        {/* <span className={props.title < 2 ? 'fadeOut' : 'fadeIn'}>
          <h1>Particles of Life</h1>
        </span> */}
  
        {this.state.title.map(arr => {
          return [
            <div style={{backgroundColor: !arr ? 'white' : 'black', height: '6px', width: '6px'}}
              className='row'>
              {arr.map(indx => {
                return [
                  <div style={{backgroundColor: !indx ? 'white' : 'black', height: '6px', width: '6px'}}>
                  </div>
                ]
              })}  
            </div>
          ]
        })}
      </div>
    )
  }
}

export default Title