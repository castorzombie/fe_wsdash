
import { serviceGet } from "../api/apiRequest";

const cryptoURL = process.env.REACT_APP_CRYPTO_COMPARE_API_URL;

const cryptoToken = process.env.REACT_APP_CRYPTO_COMPARE_TOKEN;

export const configHeaders = {
    'Content-Type': 'application/json, text/plain, */*',
    'Authorization': `Apikey ${cryptoToken}`,
};


export const coinList = () => async dispatch => {

    const url = `${cryptoURL}blockchain/list`;

    try {

        const response = await serviceGet( url, configHeaders );

        return response.data;

    } catch ( error ) {
            
       return { error: error };

    }      

};


export const topListByCap = ( limit, currency ) => async dispatch => {

    const url = `${cryptoURL}top/mktcapfull?limit=${limit}&tsym=${currency}`;

    try {

        const response = await serviceGet( url, configHeaders );

        return response.data;

    } catch ( error ) {
            
       return { error: error };

    }      

};


export const dailySymbolVol = data => async dispatch => {

    const { coin, limit, currency } = data;

    const url = `${cryptoURL}symbol/histoday?fsym=${coin}&tsym=${currency}&limit=${limit}`;

    try {

        const response = await serviceGet( url, configHeaders );

        return response.data;
        

    } catch ( error ) {

        return { error : error }

    }

};


export const historicalPair = data => async dispatch => {

    const { period, coin, quote, limit } = data;

    const url = `${cryptoURL}v2/histo${period}?fsym=${coin}&tsym=${quote}&limit=${limit}`;

    try {

        const response = await serviceGet( url, configHeaders );


        return response.data;
        

    } catch ( error ) {

        return { error : error }

    }

}