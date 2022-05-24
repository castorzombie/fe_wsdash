import { serviceGet, servicePost } from "../api/apiRequest"
import { types } from '../types/types';

const domain = process.env.REACT_APP_API_URL;

const configHeaders = {
    'Content-type': 'application/json'
};

const login = user => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({ 
    type: types.authLogout 
});

const checkLogout = () => ({ 
    type: types.authCheck
});


export const userLogin = ( email, password ) => async dispatch => {

    const url  = `${domain}/auth`;
    const data = JSON.stringify({ email, password });

    try {

        const response = await servicePost( 
            url, 
            data, 
            configHeaders 
        );

        if( response.data.ok ) {

            localStorage.setItem( 'token', response.data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( 
                login({
                    uid: response.data.uid,
                    name: response.data.name
                }) 
            );

            return response;

        } 

    } catch ( error ) {

        return { error: error };

    }      

};


export const userRegister = ( name, email, password ) => async dispatch => {

    const url  = `${domain}/auth/new`;
    const data = JSON.stringify({ name, email, password });

    try {

        const response = await servicePost( 
            url, 
            data, 
            configHeaders 
        );

            localStorage.setItem( 'token', response.data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( 
                login({
                    uid: response.data.uid,
                    name: response.data.name
                }) 
            );

            return response;


    } catch ( error ) {

        return { error: error };

    }      

};


export const userCheck = () => async dispatch => {

    const url  = `${domain}/auth/renew`;
    configHeaders['x-token'] = localStorage.getItem('token') || '';

    try {

        const response = await serviceGet( 
            url, 
            configHeaders 
        );

        if( response.data.ok ) {

            localStorage.setItem('token', response.data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( 
                login({
                    uid: response.data.uid,
                    name: response.data.name
                }) 
            );

            return response.data.uid;

        } 

    } catch ( error ) {
            
        dispatch( 
            checkLogout() 
        );

    }      

};


export const startLogout = () => {
    
    return dispatch => {

        localStorage.clear();

        dispatch( 
            logout()
        );

    }

};

