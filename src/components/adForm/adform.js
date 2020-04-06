import React, { Component } from 'react'

export default class Adform extends Component {


    // uploadAdd = ()=>{
    //     let price = this.refs.price.value;
    //     let desc = this.refs.description.value;
    //     let place = this.refs.location.value;
    //     let img = this.refs.img.value;
    
    //     let newAdd = { 
    //       liked: false,
    //       days: "1 day ago",
    //       price,
    //       desc,
    //       place,
    //       featured: true,
    //       img
    
    //     }
    //     this.setState({
    //       ads: [...this.state.featuredArr , newAdd]
    //     })
    
    //     this.state.featuredArr = [...this.state.featuredArr , newAdd]
    
    //   }

    getItems = (evt)=>{
        if (evt.target.name == 'img') {
          this.setState({
            [evt.target.name]: URL.createObjectURL(evt.target.files[0])
        })
        }else{
        this.setState({
            [evt.target.name]: evt.target.value
        })
      }
        // console.log(this.state);
        
    }
    uploadAdd = ()=>{
        
        this.props.addNewAd(this.state)
    }
  render() {
    return (
      <div>
        
        <input type="text" name="price" placeholder="Write Price" onChange={this.getItems}/>
        <input type="text" name="desc" placeholder="Write Description" onChange={this.getItems}/>
        <input type="text" name="location" placeholder="Write Location" onChange={this.getItems}/>
        <input type="file" name='img' placeholder="Paste the address of the image" onChange={this.getItems}/>
        <button onClick={this.uploadAdd}>Upload Add</button>
        


      </div>
    )
  }
}
