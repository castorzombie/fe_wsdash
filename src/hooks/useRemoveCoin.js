import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCoin } from './../actions/coins';
import { connectCryptoEvents } from './../actions/websocket';

export default function useRemoveCoin( delSelected ){

    const dispatch = useDispatch();
    
    const [ remove ] = useState('coin removed');

    const { exchange, quote } = useSelector( state => state.setting );

    useEffect( () => {

        if( delSelected ) {

            dispatch( 
                removeCoin( 
                    delSelected.id 
                ) 
            );

            dispatch(
                connectCryptoEvents( 
                    'SubRemove',  
                    [
                        `0~${exchange}~${delSelected.name}~${quote}`,
                        `11~${delSelected.name}`
                    ]  
                )
            )
            
        }

    }, [ 
        delSelected, 
        dispatch,
        exchange,
        quote ] );
    
        return [ remove ] ;

}