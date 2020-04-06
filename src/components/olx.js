import React from 'react';
import logo from './logo.svg';
import '../App.css';
import Ad from './ad/ad'
import Adform from './adForm/adform';
import { BrowserRouter, Route } from 'react-router-dom'



class Olx extends React.Component {

  constructor() {
    super();

    this.state.featuredArr = this.state.ads


  }

  state = {


    featuredArr: [],
    ads: [
      {
        liked: false,
        days: "8 days ago",
        desc: "This is a descruption",
        price: 11500,
        place: "FSD, Punjab",
        featured: false,
        img: "https://apollo-singapore.akamaized.net/v1/files/gnskth9m6l6f3-PK/image;s=272x0"
      },
      {
        liked: false,
        days: "1 days ago",
        desc: "This is a descruption",
        price: 35000,
        place: "FSD, Punjab",
        featured: true,
        img: "https://apollo-singapore.akamaized.net:443/v1/files/64ksy57gb5kv1-PK/image;s=272x0"
      },
      {
        liked: false,
        days: "7 days ago",
        price: 9800,
        desc: "This is a descruption",
        place: "Jhang, Punjab",
        featured: false,
        img: "https://apollo-singapore.akamaized.net:443/v1/files/cddpqikkbzrl1-PK/image;s=272x0"
      },
      {
        liked: false,
        days: "10 days ago",
        price: 25000,
        place: "Karachi, Sindh",
        featured: true,
        desc: "This is a descruption 5",
        img: "https://apollo-singapore.akamaized.net:443/v1/files/64ksy57gb5kv1-PK/image;s=272x0"

      },
      {
        liked: false,
        days: "5 days ago",
        price: 3000,
        place: "ISD",
        featured: false,
        desc: "This is a descruption 3",
        img: "https://apollo-singapore.akamaized.net:443/v1/files/cddpqikkbzrl1-PK/image;s=272x0"

      },
      {
        liked: false,
        days: "5 days ago",
        price: 3000,
        place: "FSD, Punjab",
        featured: false,
        desc: "This is a descruption  1",
        img: "https://apollo-singapore.akamaized.net/v1/files/gnskth9m6l6f3-PK/image;s=272x0"

      },
      {
        liked: false,
        days: "1 days ago",
        price: 5500,
        place: "LHR, Punjab",
        desc: "This is a islamabad descruption 2",
        featured: true,
        img: "https://apollo-singapore.akamaized.net:443/v1/files/64ksy57gb5kv1-PK/image;s=272x0"

      }
    ]

  }

  filteredItem = (evt) => {
    console.log('hey');

    if (evt.target.checked) {
      let featured = this.state.ads.filter((ads) => {
        return ads.featured == true;
      })

      this.state.featuredArr = featured
    }
    else {
      this.state.featuredArr = this.state.ads
    }
    this.forceUpdate()
  }

  description = (evt) => {
    let search = evt.target.value


    let featured = this.state.ads.filter((ads) => {
      return ads.desc.toLowerCase().includes(search.toLowerCase());
    })


    this.state.featuredArr = featured


    this.forceUpdate()



  }

  addNewAd = (add) => {
    this.setState({
      ads: [...this.state.featuredArr, add]
    })

    this.state.featuredArr = [...this.state.featuredArr, add]

  }
  deleteItem = (index) => {

    this.state.ads.splice(index, index + 1)
    this.setState(this.state.ads)
  }

  render() {
    return (
      <BrowserRouter>
        <Route path='/addNewAd' component={Adform} />
        <Route path='/' exact render={() => {
          return <>
          <div className="App">
            <strong>Featured Items</strong>
            <input type="checkbox" onChange={this.filteredItem} />
            <strong>Search for Description</strong>
            <input type="text" className='descInput' onInput={this.description} />
            <h3>Form to add items.</h3>
            <Adform addNewAd={this.addNewAd} />

            <div className="adsContainer">

              {this.state.featuredArr.map((ad, index) => {

                return <Ad ad={ad} iterate={index} deleteNow={this.deleteItem} />

              })}

            </div>
          </div>
          </>
        }} />
      </BrowserRouter>
    );
  }
}

export default Olx;
