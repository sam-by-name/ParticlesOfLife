import React, {Component} from 'react'

import {curveAppear, appear, disappear} from '../../lib/title'

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.titleArr,
      j: 0,
      o: this.props.length
    }
    this.raf = 0
  }

  componentDidMount() {
    this.draw()
  }

  draw = () => {
    if (this.state.o >= 0) {
      let q = this.state
      let arr = appear(q.title, q.j, 0, q.title[0].length, this.props.title)
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
      let arr = curveAppear(q.title, q.j - 1, 14, q.title[0].length + 13)
      this.setState({
        title: arr,
        j: q.j - 1,
        o: q.o + 1
      })
      this.raf = requestAnimationFrame(this.curve)
    }
    else if (!this.props.boo){
      cancelAnimationFrame(this.raf)
      setTimeout(() => {
        this.unDraw()
      }, 1000)
    } else {
      cancelAnimationFrame(this.raf)
      this.props.func()
    }
  }

  unDraw = () => {
    if (this.state.o >= 0) {
      let q = this.state
      let arr = disappear(q.title, q.o, 14, q.title[0].length + 13, this.props.title)
      this.setState({
        title: arr,
        j: q.j + 1,
        o: q.o - 1
      })
      this.raf = requestAnimationFrame(this.unDraw)
    } else this.props.func()
  }
  


  render() {
    let p = this.props
    return (
      <div className={p.class} style={{
        width: `${this.state.title[0].length * p.size}px`,
        transform: `rotate(${p.flip ? 180 : 0}deg)`
      }}>
        {this.state.title.map(arr => {
          return [
            <div className='row' style={{height: `${p.size}px`}}>
              {arr.map(indx => {
                return [
                  <div style={{backgroundColor: indx.bG ? indx.bG : indx.color,
                               borderRadius: indx.alive ? indx.radius : '0',
                               height: `${p.size}px`, width: `${p.size}px`}}>
                    {indx.bG &&
                      <div style={{backgroundColor: 'black',
                                   borderRadius: indx.radius,
                                   height: `${p.size}px`, width: `${p.size}px`}}>
                      </div>
                    }
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