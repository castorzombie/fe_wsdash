import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCoin, setActiveCoin } from './../actions/coins';
import { connectCryptoEvents } from './../actions/websocket';

export default function useAddCoin( newSelected ){

    const dispatch = useDispatch();

    const { exchange, quote } = useSelector( state => state.setting );

    const { activeCoin } = useSelector( state => state.coin );
    
    const [ add ] = useState('coin added');

    useEffect( () => {

        if( newSelected && newSelected.name !== activeCoin ) {

            dispatch( 
                addNewCoin( 
                    newSelected 
                ) 
            );

            dispatch(
                setActiveCoin(
                    newSelected.name
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
        activeCoin, 
        dispatch,
        exchange,
        quote ] );
    
        return [ add ] ;

}