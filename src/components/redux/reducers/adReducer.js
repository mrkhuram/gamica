
let state = {
  featuredArr: [],
  ads: []

}


export default (oldData = state, newData) => {

  oldData = JSON.parse(JSON.stringify(oldData))

  switch (newData.type) {

  case "AD_DELETED":

  let deletedAd = oldData.ads.find((ad)=>{
      return ad._id == newData.payload;
  })

  let index = oldData.ads.indexOf(deletedAd);
  oldData.ads.splice(index, 1);
  break



   case "ADS_RECEIVED":
   oldData.ads = newData.payload;
   break;

    case "addNewAd":
      oldData.ads.push(newData.data)
      break;

    case "remove_item":
      console.log(newData.data, oldData);

      oldData.ads.splice(newData.data, 1)
      break;
    case "filteredItem":
      console.log(newData.data);
      oldData.ads = newData.data


      break;
    case "allItems":
      console.log(newData.data);
      oldData.ads = newData.data


      break;
    case "descSearch":
      console.log(newData.data);
      oldData.ads = newData.data


      break;
    default:
      break;
  }
  return oldData;

}