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
      cell: 5,
      transform: 0
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
    this.updateWindowDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    let cell, portrait, transform = false
    let p = this.props
    let iW = window.innerWidth
    let iH = window.innerHeight - (window.innerHeight * (20 / 100))
    portrait = iH > iW ? true : false
    if (portrait && (p.x < p.y)) transform = true
    else if (!portrait && (p.x > p.y)) transform = true // what if board is square?
    // if (transform) width = window.innerHeight
    // else width = window.innerWidth
    let x = p.x > p.y ? p.x : p.y // x = the larger length of the board
    let sml = iW < iH ? iW : iH // sml = the smaller length of the window
    // if (transform) {
    //   // x = p.x < p.y ? p.x : p.y
    //   sml = iW > iH ? iW : iH
    // }
    cell = sml / x
    // based off of ratio of screen and ratio of the board?
    
    // if (this.state.mobile) { // think there are some problems here
    //   if (p.x > p.y && portrait) {         // board is taller than wide, window is portrait
    //     width = window.innerWidth
    //     cell = width / p.y
    //   } else if (p.x < p.y && portrait) {  // board is wider than tall, window is portrait
    //     width = (window.innerHeight / 4) * 3
    //     cell = width / p.x
    //   } else if (p.x > p.y && !portrait) { // board is taller than wide, window is landscape
    //     width = window.innerHeight
    //     cell = width / p.y
    //   } else if (p.x < p.y && !portrait) { // board is wider than tall, window is landscape
    //     width = window.innerWidth
    //     cell = width / p.x
    //   }
    // } else { // desktop
      // if (portrait) {
        // if (iW > 1400) {
        //   width = iW - (iW * (30 / 100))
        // } else if (iW > 1000) {
        //   width = iW - (iW * (20 / 100))
        // } else  if (iW > 600) {
        //   width = iW - (iW * (5 / 100))  
        // } else {
        //   width = iW
        // }
      // } 
      // else { // screen is landscape
      //   if (window.innerWidth > 1400) {
      //     width = width - (window.innerWidth * (20 / 100))
      //   } else if (window.innerWidth > 1000) {
      //     width = width - (window.innerWidth * (10 / 100))
      //   } else  if (window.innerWidth > 600) {
      //     width = width - (window.innerWidth * (5 / 100))  
      //   }
      //   cell = width / p.x
      // }
      // if (window.innerWidth < 600) {
      //   cell = window.innerWidth / this.props.y
      //   width = window.innerWidth
      // } else if (window.innerWidth < 1000) {
      //   cell = 700 / this.props.y
      //   width = 700
      // }
    // }
    this.setState({
      cell,
      transform: transform ? 90 : 0
    })
  }

  render() {
    return (
      <div className='lifeCont'>
        <div className='lifeDiv'>
          <div className='life' style={{
            transform: `rotate(${this.state.transform}deg)`
          }}>
            <Grid cell={this.state.cell} />
          </div>
        </div>
          <Control/>
          <Stats/>
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