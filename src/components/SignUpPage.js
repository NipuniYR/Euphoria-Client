import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import {userSignUpRequest} from '../actions/signUpActions';

import PropTypes from 'prop-types';

import SignUpFormUser from './SignUpFormUser';
import NavBarLandingPage from './NavBarLandingPage';
import FooterLandingPage from './FooterLandingPage';
import {Helmet} from 'react-helmet';

class SignUpPage extends Component {
    render() {
        const {userSignUpRequest}=this.props;
        return (
            <Grid
                container
                spacing={3}
            >
                <Grid container xs={12} style={{ marginBottom:'0' }}>
                    <NavBarLandingPage></NavBarLandingPage>
                </Grid>

                <Grid item xs={12}>
                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '70vh',marginTop:'0' }}
                        >
                            <div style={{backgroundColor:'white',padding:'100px',marginTop:'0'}}>
                                <Grid container xs={12} direction="column" justify="center" alignItems="center" >
                                    <Typography  variant="h4" gutterBottom>
                                    Get started!
                                    </Typography>
                                </Grid>   
                                <Grid item xs={12} style={{ minWidth: '50vh' }}>
                                    <Helmet>
                                        <style>{'body { background-color: white; }'}</style>
                                    </Helmet>
                                    
                                    <SignUpFormUser userSignUpRequest={userSignUpRequest} />
                                </Grid>   
                            </div>
                        </Grid> 
                </Grid>
                <Grid container xs={12} style={{ marginBottom:'0' }}
                            alignItems="center"
                            justify="center"
                >
                    <FooterLandingPage></FooterLandingPage>
                </Grid>
            
            </Grid>
            
        )
    }
    
}

SignUpFormUser.propTypes={
    userSignUpRequest : PropTypes.func.isRequired
}

export default connect(null,{userSignUpRequest})(SignUpPage);