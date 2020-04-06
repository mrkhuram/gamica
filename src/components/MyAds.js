import React from 'react';
import Ad from './ad/ad';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

export default class MyAds extends React.Component {

  constructor(props){
    super(props)
    console.log(props);
    
  }

    render=()=>{

       return <div className="adsContainer">

        {this.props.featuredArr.map((ad, index) => {

          return <Ad ad={ad} iterate={index} deleteNow={this.deleteItem} />

        })}

      </div>

    }

    }