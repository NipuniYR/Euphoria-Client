import React,{useState,useEffect,Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import {connect} from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import {signIn} from '../actions/signInActions';
import {signInStyles} from '../assets/Styles';

import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import logo from '../assets/eu-logo.png';
import axios from 'axios';

import UserProfile from '../assets/UserProfile';
import Counselors from '../views/user/Counselors'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Euphoria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const styles=theme=>({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});



class SignIn extends Component{
  constructor(props){
    super(props);
    this.state={
      'email':'',
      'password':''
    }
  }
   
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }
  handleClick=(e)=>{
    e.preventDefault();
    console.log("redirect");
    console.log(this.state)
    axios.post('http://localhost:8080/api/user/signin',JSON.stringify(this.state),{headers: {
        'Content-Type': 'application/json',
    }})
    .then((response)=>{
      if(response.data){
        console.log("signed in");
        const user=response.data[0]
        UserProfile.setEmail(user.email);
        UserProfile.setName(user.firstname);
        UserProfile.setId(user.uid)
        this.props.history.push('/user/counselors');
      }else{
        alert("wrong username or password");
      }
    }) 
    

  }
  render(){
      const {classes}=this.props;
      return(
        <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                
                <Avatar alt="Remy Sharp" src={logo} className={classes.bigAvatar} /> <h2>Euphoria</h2>
                {/* <Typography component="h1" variant="h5">
                  Euphoria
                </Typography> */}
                <form className={classes.form} noValidate onSubmit={this.handleClick} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange}

                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button

                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/user/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
      )


  }

}
SignIn.propTypes={
  classes:PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);
// SignIn.propTypes = {
//   signIn : PropTypes.func.isRequired
// }
// const mapStateToProps=(state)=>({
//   sign : state.sign
// });
