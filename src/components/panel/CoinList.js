import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';

import { getSelectedCoins } from '../../actions/coins';
import { connectCryptoEvents } from '../../actions/websocket';
import { topListByCap } from '../../actions/crypto';
import { topListByCapMock } from '../../mocks/topListByCapMock';
import useMultiSelectChip from '../../hooks/useMultipleSelectChip';
import useAddCoin from '../../hooks/useAddCoin';
import useRemoveCoin from '../../hooks/useRemoveCoin';

const cryptocompareURL = process.env.REACT_APP_CRYPTO_COMPARE_URL;

const CoinList = ({
    getSelectedCoins,
    topListByCap,
    connectCryptoEvents
}) => {

    const { uid } = useSelector( state => state.auth );

    const { exchange, quote } = useSelector( state => state.setting );
    
    const isFirst = useRef( true );

    const [ list, setList ] = useState( [] );

    const [ defaultCoins, setDefaultCoins ] = useState( [] );

    const [ allowWebsocket ] = useState( true );

    const [ //allSelected,
            newSelected,
            delSelected,    
            TopListByMarketCap ] = useMultiSelectChip ( 
                                    "Coins", 
                                    defaultCoins, 
                                    list );
    
    const [ add ] = useAddCoin( newSelected );

    const [remove ] = useRemoveCoin( delSelected );


    const createCoinsList = useCallback( data => {

        const extract = data.map( item => {

            const { Id, Name, FullName, ImageUrl } = item.CoinInfo;

            return { 
                itemId: Id, 
                name: Name, 
                description: FullName,
                image: `${cryptocompareURL}${ImageUrl}` 
            }

        });

        setList( extract ); 

    }, [ setList ] );


    useEffect( () => {

        if( isFirst.current &&
            exchange !== '' && 
            quote !== '' ) {
            console.log("coinList 70")
            isFirst.current = false;
            topListByCap( 20, 'EUR' )         
            //topListByCapMock()
            .then( 
                res => createCoinsList( res.Data ) 
            )
            .then( 
                () => { return getSelectedCoins( uid ); } 
            )
            .then( 
                userCoins => {
                    if( Array.isArray( userCoins ) ) {
                        setDefaultCoins( userCoins ); 
                        return userCoins;
                    }
                }
            )
            .then(
                userCoins => {
                    if( userCoins &&  allowWebsocket ) {
                        connectCryptoEvents( 
                            'SubAdd',  
                            userCoins.reduce( 
                                ( a, b ) => [ 
                                    ...a, 
                                    `0~${exchange}~${b.name}~${quote}`, 
                                    `11~${b.name}`
                                ], [] 
                            )
                        );
                    }
                }
            )
        }

    },[ isFirst,
        topListByCap,
        uid,
        exchange,
        quote, 
        allowWebsocket,
        createCoinsList, 
        getSelectedCoins, 
        setDefaultCoins,
        connectCryptoEvents ] );

    return <TopListByMarketCap /> 
        
}

const mapDispatchToProps = { 
    getSelectedCoins,
    topListByCap,
    connectCryptoEvents
}

export default connect( null, mapDispatchToProps )( CoinList );