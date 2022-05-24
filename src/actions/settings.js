
import { serviceGet, servicePost, servicePut } from "../api/apiRequest";

import { types } from '../types/types';

const domain = process.env.REACT_APP_API_URL;

const configHeaders = {
    'Content-type': 'application/json'
};


const addSetting = setting => ({
    type: types.addSetting,
    payload: setting
});

const updateSetting = id => ({ 
    type: types.updateSetting,
    payload: id
});


export const getSetting = uid => {

    return async dispatch => {

        const url = `${domain}/settings/${ uid }`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {
            
            const response  = await serviceGet(
                url,
                configHeaders
            ) 

            if ( response.data.ok ) {

                dispatch( 
                    addSetting( response.data.setting[0] ) 
                );

            }

        } catch (error) {

            return { error: error }

        }

    }

};


export const createSetting = setting => {

    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        const url = `${domain}/settings`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {

            setting.user = {
                _id: uid,
                name: name
            }

            const response = await servicePost( 
                url, 
                setting, 
                configHeaders 
            );

            if( response.data.ok ){

                dispatch(
                    addSetting( response.data.setting ) 
                );

            }

        } catch ( error ) {

            return { error: error };

        }

    }

};


export const changeSetting = setting => {
    
    return async dispatch => {

        const url = `${domain}/settings/${ setting.id }`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {

            const response = await servicePut( 
                url,
                setting, 
                configHeaders 
            );

            if ( response.data.ok ) {

                const { setting } = response.data;

                dispatch( 
                    updateSetting( setting ) 
                );

                return setting;

            } 

        } catch ( error ) {
           
            return { error: error };

        }

    }

};
