import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCoin } from './../actions/coins';
import { connectCryptoEvents } from './../actions/websocket';

export default function useAddCoin( newSelected ){

    const dispatch = useDispatch();

    const { exchange, quote } = useSelector( state => state.setting );
    
    const [ add ] = useState('coin added');

    useEffect( () => {

        if( newSelected ) {

            dispatch( 
                addNewCoin( 
                    newSelected 
                ) 
            );

            dispatch(
                connectCryptoEvents( 
                    'SubAdd',  
                    [
                        `0~${exchange}~${newSelected.name}~${quote}`,
                        `11~${newSelected.name}`
                    ] 
                )
            )

        }

    }, [ 
        newSelected, 
        dispatch,
        exchange,
        quote ] );
    
        return [ add ] ;

}