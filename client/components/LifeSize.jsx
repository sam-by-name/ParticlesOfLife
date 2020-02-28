import React, {Component, Fragment} from 'react'

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
      
    // setTimeout(() => {
    // }, 9200)
  }

  render() {
    let x = this.state.title
    return (
      <div className='lifeSizeDiv' >
        <h3 className='lifeSizeTxt' >
          <span>
            {this.state.temp.length
              ? !x.length % 2 === 0 
                ? x + '|' 
                : x
              : x}
          </span> 
        </h3>
        
        {/* <span> */}
        {!this.state.temp.length &&
          <input
            className='menuInput'
            type='text'
            name='xy'
            placeholder='10-50'
            onChange={this.props.handleChange}
            value={this.props.xy}
          />
        }
        {/* </span>
        <span> */}
          {this.props.xy.length > 1 &&
            <button className='menuBtn' onClick={this.props.lifeSize}>
              Good Choice
            </button>
          }
        {/* </span> */}
      </div>
    )
  }
}

export default LifeSize