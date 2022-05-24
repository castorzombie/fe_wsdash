import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import LogIn from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

import { DashBoard } from '../components/dashboard/DashBoard';
import { userCheck } from '../actions/auth';
import { getSetting } from '../actions/settings';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


const AppRouter = ({
    userCheck,
    getSetting
}) => {
    
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {

        userCheck().then( res => {
            if( res ) {
                getSetting( res );
            }
        });
    
    }, [ userCheck, getSetting ] );


    if ( checking ) {

        return (<h5>Espere...</h5>);

    }

    return (
        <Router>
            <Switch>
                <PublicRoute 
                    exact 
                    path="/login" 
                    component={ props => <LogIn { ...props } /> } 
                    isAuthenticated={ !!uid }
                />
                <PublicRoute 
                    exact 
                    path="/signin" 
                    component={ props => <SignUp { ...props } /> } 
                    isAuthenticated={ !!uid }
                />
                <PrivateRoute 
                    exact 
                    path="/" 
                    component={ DashBoard } 
                    isAuthenticated={ !!uid }
                />
                <Redirect to="/" />   
            </Switch>
        </Router>
    )
};

const mapDispatchToProps = { 
    userCheck,
    getSetting   
};

export default connect( null, mapDispatchToProps )( AppRouter );