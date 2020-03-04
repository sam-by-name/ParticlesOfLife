import React, {Component} from 'react'

import {title, flicker, arr, color} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      count: 164 // ((title[0].length * title.length) - 1) / 2
    }
  }
  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.count) {
        let x = flicker(this.state.title, 2, 0, 0)
        this.setState({
          title: x,
          count: this.state.count - 1
        })
      } else clearInterval(timer)
    }, 3)

  }


  render() {
    return (
      <div className='menuTitle' style={{width: `${title[0].length * 6}px`}}>
        {/* <span className={props.title < 2 ? 'fadeOut' : 'fadeIn'}>
          <h1>Particles of Life</h1>
        </span> */}
  
        {this.state.title.map(arr => {
          return [
            <div style={{backgroundColor: color[arr], height: '6px', width: '6px'}}
              className='row'>
              {arr.map(indx => {
                return [
                  <div style={{backgroundColor: color[indx], height: '6px', width: '6px'}}>
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