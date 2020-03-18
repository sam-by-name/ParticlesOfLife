import React, {Component} from 'react'
import {connect} from 'react-redux'

import Control from './Control'
import Stats from './Stats'
import Grid from './Grid'

// const Life = (props) => {
//   return (
//     <div className='lifeCont'>
//       <div className='lifeDiv'>
//         <div className='life' style={{width: props.cell * props.y}}>
//           <Grid />
//         </div>
//         <Control/>
//         <Stats/>
//       </div>
//     </div>
//   )
// } 

// const mapStateToProps = state => {
//   return {
//     cell: state.xy.cell,
//     y: state.xy.y
//   }
// }


// export default connect(mapStateToProps)(Life)


class Life extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: /Mobi|Android/i.test(navigator.userAgent),
      width: window.innerWidth,
      cell: 5,
      portrait: false,
      transform: 0
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  // transform: rotate(90deg)
  updateWindowDimensions = () => {
    let cell, width, portrait, transform
    portrait = window.innerHeight > window.innerWidth ? true : false
    let p = this.props
    transform = portrait && (p.x < p.y) ? false : true
    if (this.state.mobile) { // think there are some problems here
      if (p.x > p.y && portrait) {         // board is taller than wide, window is portrait
        width = window.innerWidth
        cell = width / p.y
        transform = 0
      } else if (p.x < p.y && portrait) {  // board is wider than tall, window is portrait
        width = (window.innerHeight / 4) * 3
        cell = width / p.x
        transform = 90
      } else if (p.x > p.y && !portrait) { // board is taller than wide, window is landscape
        width = window.innerHeight
        cell = width / p.y
        transform = 90
      } else if (p.x < p.y && !portrait) { // board is wider than tall, window is landscape
        width = window.innerWidth
        cell = width / p.x
        transform = 0
      }
    } else {
      if (window.innerWidth < 600) {
        cell = window.innerWidth / this.props.y
        width = window.innerWidth
      } else if (window.innerWidth < 1000) {
        cell = 700 / this.props.y
        width = 700
      }
    }
    this.setState({
      width,
      cell,
      portrait,
      transform
    })
  }

  render() {
    return (
      <div className='lifeCont'>
        <div className='lifeDiv'>
          <div className='life' style={{
            width: this.state.width,
            transform: `transform(${this.state.transform}deg)`
          }}>
            <Grid cell={this.state.cell} />
          </div>
          <Control/>
          <Stats/>
        </div>
      </div>
    )

  }
} 

const mapStateToProps = state => {
  return {
    x: state.xy.x,
    y: state.xy.y
  }
}

export default connect(mapStateToProps)(Life)