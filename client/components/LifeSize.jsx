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
    return (
      <Fragment>
        <h3>{this.state.temp.length ? this.state.title + '_' : this.state.title}</h3>  
  
        <input
          className='menuInput'
          type='text'
          name='xy'
          placeholder='10-50'
          onChange={this.props.handleChange}
          value={this.props.xy}
        />
        <button onClick={this.props.lifeSize}>As you wish</button>
      </Fragment>
    )
  }
}

export default LifeSize