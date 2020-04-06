import React, { Component } from 'react'

export default class EditAd extends Component {



  arr = this.props.addz[this.props.adID]

  newImg =(evt)=>{

    let file = evt.target.files[0]
    this.arr.img = URL.createObjectURL(file)
    this.props.onEditAd(this.arr,this.props.index)
    
    
  } 

  onChange =(evt)=>{
    this.arr[evt.target.getAttribute('data-name')] = evt.target.value
    this.props.onEditAd(this.arr, this.props.index)
  }
  
  
  render() {
    return (
      <div>

          <img src={this.arr.img} alt=""/>
          <input type="file" data-try='img' onChange={this.newImg}/>
          <br/>
          <input type="text" value={this.arr.desc} data-name='desc' onChange={this.onChange}/>
            <br/>
          <input type="text" value={this.arr.price} data-name='price' onChange={this.onChange}/>



      </div>
    )
  }
}
