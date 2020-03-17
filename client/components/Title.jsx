import React, {Component} from 'react'

import {title, arr, curveAppear, appear, disappear} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      j: 0,
      o: 88
    }
    this.raf = 0
  }

  componentDidMount() {
    this.draw()
  }

  draw = () => {
    if (this.state.o >= 0) {
      let q = this.state
      let arr = appear(q.title, q.j, 0, title[0].length)
      this.setState({
        title: arr,
        j: q.j + 1,
        o: q.o - 1
      })
      this.raf = requestAnimationFrame(this.draw)
    }
    else {
      cancelAnimationFrame(this.raf)
      this.curve()
    }
  }

  curve = () => {
    if (this.state.j > 0) {
      let q = this.state
      let arr = curveAppear(q.title, q.j - 1, 14, title[0].length + 13)
      this.setState({
        title: arr,
        j: q.j - 1,
        o: q.o + 1
      })
      this.raf = requestAnimationFrame(this.curve)
    }
    else {
      cancelAnimationFrame(this.raf)
      setTimeout(() => {
        this.unDraw()
      }, 1000)
    } 
  }

  unDraw = () => {
    if (this.state.o >= 0) {
      let q = this.state
      let arr = disappear(q.title, q.o, 14, title[0].length + 13)
      this.setState({
        title: arr,
        j: q.j + 1,
        o: q.o - 1
      })
      this.raf = requestAnimationFrame(this.unDraw)
    } else this.props.lifeSize()
  }
  


  render() {
    return (
      <div>
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