import React, {Component} from 'react'

import {title, flicker, arr, color} from '../../lib/title'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      title: arr(),
      count: 164
    }
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
      requestAnimationFrame(this.draw)
    }
  }


  render() {
    return (
      <div className={this.props.title < 2 ? 'fadeOut' : 'fadeIn'}>
        <div className='menuTitle' style={{width: `${title[0].length * 6}px`}}>
  
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
      </div>
    )
  }
}

export default Title