import store from './components/redux/store';


let obj = {
    loadAds:()=>{

        fetch('/ads/get_ads', {
            method: 'GET'
          }).then((resp) => {
      
            resp.json().then((resp) => {
      
              console.log(resp);
      
              store.dispatch({
                type: "ADS_RECEIVED",
                payload: resp.ads
                });
      
                store.dispatch({
                  type: "USER_LOGIN_SUCESS",
                  payload: resp.user
                });
                
                //Should run only when when user is on the login route
              // if(resp.user._id){
              //   history.push('/');
              // }
      
            })
      
          });


    },
    deleteAd:(id)=>{

        fetch('/ads/delete_ad?cid='+id, {
            method:'DELETE'            
        }).then((resp)=>{

            return resp.json();

        }).then((resp)=>{

            if(resp.ok){

                store.dispatch({
                    type:"AD_DELETED",
                    payload:id
                });

                alert("deleted");
            }

        })
 
    },
    createAd: (data) => {
     
        let formData = new FormData();        
        console.log(data);

        for(var item in data){
            console.log(data);
            

            formData.append(item, data[item]);

        }
        console.log(formData)

        fetch('/ads/post_ad', {
            method: 'POST',
            body: formData
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(data)
        }).then((resp) => {

            return resp.json();

        }).then((resp) => {

            if (resp.ok) {
                alert("Ad posted");
            }

        })

    },
    logout:(data)=>{

        fetch('/auth/logout', {
            method:'POST'
        }).then(resp=>resp.json()).then((resp)=>{

            if(resp.success){
                store.dispatch({
                    type:"USER_LOGGED_OUT"
                })
            }

        })


    },
    login: (data) => {

        
        fetch('/auth/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((resp)=>{

            resp.json().then((resp)=>{
                
                if(resp._id){
                    alert("User found")
                    store.dispatch({
                        type:'USER_LOGIN_SUCESS',
                        payload:resp
                    });;
                }

            })

        }).catch((resp)=>{
            console.log(resp); 
        });

    },
    signup: (data) => {

        fetch('/auth/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((resp)=>{

            resp.json().then((resp)=>{
                
                if(resp.success){
                    alert("User created")
                }

            })

        }).catch((resp)=>{
            console.log(resp); 
        });

    }
}

export default obj;