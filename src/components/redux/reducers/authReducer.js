import services from './../../../services';
import history from './../../../history'

let initialData = {
    inprocess: false,
    loggedInUser: {ads:[]}
} 

const userReducer = (state = initialData, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'USER_LOGIN_START':

        newState.inprocess = true;
        console.log(action.payload);

        services.login(action.payload);

            break;

        case "USER_LOGGED_OUT":
        newState.loggedInUser = {ads:[]};
        newState.inprocess = false;
        break;
        
        case 'USER_LOGIN_SUCESS':
            newState.loggedInUser = action.payload
            newState.inprocess = false;
            break;

        case 'USER_LOGIN_FAIL':
            break;

        case 'USER_SIGNUP_START':
            newState.inprocess = true;
            console.log(action.payload);

            services.signup(action.payload);


            break;

        case 'USER_SIGNUP_SUCCESS':
            newState.inprocess = false;
            setTimeout(() => {
                history.push('/login');
            });
            break;

    }

    return newState;
}


export default userReducer;