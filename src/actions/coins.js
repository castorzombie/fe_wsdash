
import { serviceGet, servicePost, serviceDelete } from "../api/apiRequest";

import { types } from '../types/types';

const domain = process.env.REACT_APP_API_URL;

const configHeaders = {
    'Content-type': 'application/json'
};

const coinsLoaded = coins => ({
    type: types.coinsLoaded,
    payload: coins
});

const addCoin = coin => ({
    type: types.addCoin,
    payload: coin
});

const deleteCoin = id => ({ 
    type: types.deleteCoin,
    payload: id
});

const activeCoin = name => ({
    type: types.activeCoin,
    payload: name
});


export const getSelectedCoins = uid => {

    return async dispatch => {

        const url = `${domain}/coins/${ uid }`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {
            
            const response  = await serviceGet(
                url,
                configHeaders
            ) 

            if ( response.data.ok )  {

                let coins = response.data.coins;

                dispatch( 
                    coinsLoaded( coins ) 
                );

                return coins;

            }

        } catch (error) {

            return { error: error }

        }

    }

}


export const addNewCoin = coin => {

    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        const url = `${domain}/coins`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {

            const response = await servicePost( 
                url, 
                coin, 
                configHeaders 
            );

            if( response.data.ok ){

                coin.id = response.data.coin.id;
                coin.user = {
                    _id: uid,
                    name: name
                }

                dispatch(
                    addCoin( coin ) 
                );

            }

        } catch ( error ) {

            return { error: error };

        }

    }

};


export const removeCoin = id => {
    
    return async dispatch => {

        const url = `${domain}/coins/${ id }`;

        configHeaders['x-token'] = localStorage.getItem('token') || '';

        try {

            const response = await serviceDelete( 
                url, 
                configHeaders 
            );

            if ( response.data.ok ) {

                dispatch( 
                    deleteCoin( id ) 
                );

            } 

        } catch ( error ) {
           
            return { error: error };

        }

    }

};


export const setActiveCoin = name => {

    return dispatch => {

        dispatch( 
            activeCoin( name ) 
        );

    }

};
