import React, {Component} from 'react'

import {title, flicker, arr, border} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      count: 164
    }
    this.raf = 0
  }

  componentDidMount() {
    this.draw()
  }

  draw = () => {
    if (this.state.count) {
      this.setState({
        title: flicker(this.state.title),
        count: this.state.count - 1
      })
      this.raf = requestAnimationFrame(this.draw)
    } else {
      cancelAnimationFrame(this.raf)
      this.curve()
    }
  }
  
  curve = () => {
    if (this.state.count < 1125) {
      this.raf = requestAnimationFrame(this.curve)
      let ti = border(this.state.title)
      this.setState({
        title: ti,
        count: this.state.count + 1
      })
    } else cancelAnimationFrame(this.raf)    
  }


  render() {
    return (
      <div className={this.props.title < 2 ? 'fadeOut' : 'fadeIn'}>
        <div className='menuTitle' style={{width: `${title[0].length * 6}px`}}>
  
        {this.state.title.map(arr => {
          return [
            <div className='row'>
              {arr.map(indx => {
                return [
                  <div style={{backgroundColor: indx.bG ? indx.bG : indx.color,
                               borderRadius: indx.alive ? indx.radius : '0',
                               height: '8px', width: '8px'}}>
                    {indx.bG &&
                    <div style={{backgroundColor: 'black',
                                 borderRadius: indx.radius,
                                 height: '8px', width: '8px'}}>
                    </div>}
                  </div>
                ]
              })}  
            </div>
          ]
        })}
        </div>
      </div>
    )
  }
}

export default Title