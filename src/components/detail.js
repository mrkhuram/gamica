import React, { Component } from 'react'

export default class Details extends Component {



  arr = this.props.addz[this.props.adID]
  
  
  render() {
    return (
      <div>

          <img src={this.arr.img} alt=""/>

          <p>{this.arr.desc}</p>
          <p>{this.arr.price}</p>



      </div>
    )
  }
}
