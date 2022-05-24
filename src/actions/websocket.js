import { types } from '../types/types';

const websocketURL = process.env.REACT_APP_CRYPTO_COMAPARE_WS_URL;

const cryptoToken = process.env.REACT_APP_CRYPTO_COMPARE_TOKEN;

const url = new URL( `${websocketURL}?api_key=${cryptoToken}` );


const tradeEvents = events => ({
    type: types.wsTrade,
    payload: events
});


const fullVolumeEvents = events => ({
    type: types.wsFullVolume,
    payload: events
});


let ccStreamer = {};


export const connectCryptoEvents = ( action, subscribe ) => async dispatch => {
    

    function connect() {

        ccStreamer = new WebSocket( url );

        console.log('connect please')
    
    }


    function handleSend() {


        const subRequest = {
            "action": action,
            "subs": subscribe
        };

        ccStreamer.send( JSON.stringify( subRequest ) );

    }
 

    if( ccStreamer.readyState === WebSocket.OPEN ) {

        handleSend();
        

    } else {

        connect();

    }


    ccStreamer.onopen = function onStreamOpen() {

            handleSend();

            console.log('Connection opened');

    }


    ccStreamer.onmessage = function onStreamMessage( e ) {

        const ev = JSON.parse( e.data );

        if( ev.TYPE === '0' ){

            dispatch( 
                tradeEvents( ev ) 
            );

        }

        if( ev.TYPE === '11' ){

            dispatch(
                fullVolumeEvents( ev )
            )

        }

    }


    ccStreamer.onclose = function onStreamClose() {

        console.log('Connection closed');

    }


}
