import React, {Component} from 'react'

class LifeSize extends Component{
  constructor (props) {
    super(props)
    this.state = {
      title: "",
      temp: "Life will need a size"
    }
  }

  componentDidMount() {
    let timer = setInterval(() => {
      if (this.state.temp.length) {
        let tl = this.state.temp
        let char = tl.charAt(0)
        this.setState({
          title: this.state.title + char,
          temp: tl.slice(1)
        })
      } else clearInterval(timer)
    }, 60)
    // this.type()
  }

  type = () => {
    if (this.state.temp.length) {
      let tl = this.state.temp
      let char = tl.charAt(0)
      this.setState({
        title: this.state.title + char,
        temp: tl.slice(1)
      })
    } 
    if (this.state.temp.charAt(0) === ' ') {
      let count = Math.floor(Math.random() * 500)
      setTimeout(() =>  requestAnimationFrame(this.type), count)
    } else requestAnimationFrame(this.type)
  }

  render() {
    let x = this.state.title
    return (
      <div className={this.props.fade ? 'fadeOut' : 'fadeIn'}>
        <div className='lifeSizeDiv'>
          <h3 className='lifeSizeTxt'>
            {this.state.temp.length
              ? !x.length % 2 === 0 
                ? x + '|' 
                : x
              : x
            }
          </h3>
          <div className={this.state.temp.length ? 'fadeOut' : 'fadeIn'}>
            <input
              className='menuInput'
              type='text'
              name='x'
              placeholder='10-150'
              onChange={this.props.handleChange}
              value={this.props.x}
            />
            <input
              className='menuInput'
              type='text'
              name='y'
              placeholder='10-150'
              onChange={this.props.handleChange}
              value={this.props.y}
            />
            <input
              className='menuInput'
              type='text'
              name='cell'
              placeholder='1-10'
              onChange={this.props.handleChange}
              value={this.props.cell}
            />
          </div>
          <span className={!this.props.x.length ? 'fadeOut' : 'fadeIn'}>
            <button className='menuBtn' onClick={this.props.lifeSize}>
              Good Choice
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default LifeSize