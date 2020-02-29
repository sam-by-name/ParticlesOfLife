import React, {Component, Fragment} from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Title from './Title'
import LifeSize from './LifeSize'
import RuleOptions from './RuleOptions'

import {createLife} from '../actions/updateLife'
import {updateXy} from '../actions/updateXy'
import {lifeRules} from '../actions/lifeRules'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xy: '',
      lifeOps: -1,
      title: 15,
      xyChosen: false,
      ready: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.showTitle()
  }

  showTitle = () => {
    setTimeout(() => {
      this.setState({title: 0})
    }, 400)    
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    this.props.updateXy(this.state.xy || '50')
    this.props.createLife(this.state.xy || '50')
    this.props.rules(this.state.lifeOps)
  }

  lifeSize = () => {
    this.setState({
      // title: -1,
      xyChosen: true
    })
  }

  render() {
    return (
      <div className='menuCont' >
        <div className='menuDiv' >
            {this.state.title > 0 
            ? <Title />
            : <Fragment></Fragment>}
            {this.state.title < 1 && !this.state.xyChosen
            ? <LifeSize
                handleChange={this.handleChange}
                xy={this.state.xy}
                lifeSize={this.lifeSize}
              />
            : <Fragment></Fragment>
            }
            {this.state.xyChosen ? 
              <RuleOptions
                lifeOps={this.state.lifeOps}
                handleChange={this.handleChange}
                xy={this.state.xy}
                handleClick={this.handleClick}
              /> 
            : <Fragment></Fragment>
            }
            {/* {this.state.lifeOps > -1 ? 
              <Link to='/board'>
                <button className='menuBtn'
                  onClick={this.handleClick}>
                    Lets Play
                </button>
              </Link>
            : <Fragment></Fragment>} */}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createLife: arr => createLife(arr),
  updateXy: num => updateXy(num),
  rules: num => lifeRules(num)
}

export default connect(null, mapDispatchToProps)(Menu)
