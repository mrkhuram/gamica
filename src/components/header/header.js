import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import store from '../redux/store';
import Slider from '@material-ui/core/Slider';
import services from '../../services';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default withRouter(connect((store) => {
    return {
        auth: store.AuthReducer
    }
})(function MenuAppBar(props) {
    const classes = useStyles();

    // const [auth, setAuth] = React.useState(true);

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    // function handleChange(event) {
    //     setAuth(event.target.checked);
    // }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }


    function valuetext(value) {
        return `${value}°C`;
      }


      const [value, setValue] = React.useState([0, 340]);
      const [anchorEl, setAnchorEl] = React.useState(null);

      const open = Boolean(anchorEl);


      const handleChange = (event, newValue) => {
      
      
        setValue(newValue);
        let data  = [newValue[0]*3, newValue[1]*3]
        console.log(data);


        fetch('/get_ads?min='+data[0]+"&max="+data[1], {
            method: 'GET'
          }).then((resp) => {
      
            resp.json().then((resp) => {
      
              console.log(resp);
      
              store.dispatch({
                type: "ADS_RECEIVED",
                payload: resp
              });
      
            })
      
          });


      };


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Photos
                    </Typography>

                    {props.auth.loggedInUser._id ? (
                        <div>
                            <b>{props.auth.loggedInUser.email}</b>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            open={open}
                            onClose={handleClose}
                            >
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                <MenuItem onClick={()=>{
                                    
                                    handleClose();
                                    services.logout();

                                
                                }}>Log out</MenuItem>
                            </Menu>
                            <Button onClick={() => {
                                props.history.push('/create_ad')
                            }} variant="contained" className={classes.button}>Create Ad</Button>
                            
                        </div>
                    ) : <div style={{float:'left'}}>                            
                            <Button onClick={() => {
                                props.history.push('/register')
                            }} variant="contained" className={classes.button}>New User</Button>
                            <Button onClick={() => {
                                props.history.push('/login')
                            }} variant="contained" className={classes.button}>Signin</Button>
                        </div>}


                    {/* <div style={{width:500, float:'left', backgroundColor:"white"}}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        />
                    </div> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}));