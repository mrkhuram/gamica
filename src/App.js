import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ad from './components/ad/ad'
import Adform from './components/adForm/adform';
import { Router, Route } from 'react-router-dom'
import Details from './components/detail'
import EditAd from './components/edit.js'
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
// SYstemJS format
import store from './components/redux/store'
import Header from './components/header/header';

import history from './history';

import Signin from './components/signin';
import Register from './components/signup';

import Ad_Form from './components/Ad_Form';
import services from './services';

import MyAds from './components/MyAds';

class App extends React.Component {

  constructor(props) {
    super();

    this.state.featuredArr = props.ads
    console.log(this.state.featuredArr);

    services.loadAds();
    

  }

  state = {


    featuredArr: [],

  }

  filteredItem = (evt) => {
    console.log('hey');

    if (evt.target.checked) {
      let featured = this.props.ads.filter((ads) => {

        return ads.featured == true;

      })
      store.dispatch({
        type: 'filteredItem',
        data: featured
      })
    }
    else {
      store.dispatch({
        type: 'allItems',
        data: this.state.featuredArr
      })
    }
  }

  description = (evt) => {
    let search = evt.target.value


    if (search != '') {
      let featured = this.props.ads.filter((ads) => {
        return ads.desc.toLowerCase().includes(search.toLowerCase());
      })
      store.dispatch({
        type: 'descSearch',
        data: featured
      })
    }
    else {
      store.dispatch({
        type: 'allItems',
        data: this.state.featuredArr
      })

    }



  }
         
  addNewAd = (add) => {

    store.dispatch({
      type: 'addNewAd',
      data: add
    })
  }
  deleteItem = (i) => {
    store.dispatch({
      type: "remove_item",
      data: i
    })
  }


  onEditAd = (ad, index) => {
    let adds = this.state.featuredArr.slice(0)
    adds[index] = ad;
    this.setState({
      featuredArr: adds
    })
  }

  render() {
    return (
      <Router history={history}>

        <Header />

        <YouTube videoId="VpHkbWFC-VY" />

      <Route path="/myads" component={()=>{

          return <MyAds featuredArr={this.props.authReducer.loggedInUser.ads}  />
      }} />

        <Route path="/create_ad" component={Ad_Form} />
        <Route path="/login" component={Signin} />
        <Route path="/register" component={Register} />

        <Route path='/edit/:adID' render={(props) => {
          return <EditAd addz={this.props.ads} adID={props.match.params.adID} onEditAd={this.onEditAd} />

        }} />


        <Route path='/addNewAd/:anId' render={(props) => {
          return <Details addz={this.props.ads} adID={props.match.params.anId} />

        }} />

        <Route path='/' exact render={() => {
          return <>
            <div className="App">
              <strong>Featured Items</strong>
              <input type="checkbox" onChange={this.filteredItem} />
              <strong>Search for Description</strong>
              <input type="text" className='descInput' onInput={this.description} />
              <h3>Form to add items.</h3>
              <Adform addNewAd={this.addNewAd} />


           <MyAds featuredArr={this.props.featuredArr} />

              {/* <div className="adsContainer">

                {this.props.featuredArr.map((ad, index) => {

                  return <Ad ad={ad} iterate={index} deleteNow={this.deleteItem} />

                })}

              </div> */}

            </div>
          </>
        }} />
      </Router>
    );
  }
}


export default connect((store) => {

  return {
    featuredArr: store.AdReducer.ads,
    ads: store.AdReducer.ads,
    authReducer: store.AuthReducer,
    store: store
  }

})(App);
