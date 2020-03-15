import React, {Component} from 'react'

import {title, flicker, arr, border} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      j: 0,
      o: 81
    }
    this.raf = 0
  }

  componentDidMount() {
    this.draw()
  }

  draw = () => {
    if (this.state.o >= 0) {
      let q = this.state
      this.setState({
        title: flicker(q.title, q.j, q.o),
        j: q.j + 1,
        o: q.o - 1
      })
      this.raf = requestAnimationFrame(this.draw)
    } 
    // else {
    //   cancelAnimationFrame(this.raf)
    //   this.curve()
    // }
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
            <div className='row' style={{height: '6px', width: '6px'}}>
              {arr.map(indx => {
                return [
                  <div style={{backgroundColor: indx.bG ? indx.bG : indx.color,
                               borderRadius: indx.alive ? indx.radius : '0',
                               height: '6px', width: '6px'}}>
                    {indx.bG &&
                    <div style={{backgroundColor: 'black',
                                 borderRadius: indx.radius,
                                 height: '6px', width: '6px'}}>
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