import React, { useEffect, useState, useRef, useCallback }  from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const PriceBox = styled('span')( 
  () => ({
    display: 'inline',
    fontSize: '12px'
}));

const PriceDiff = styled('span')( 
  ({ inc }) => ({
    color: inc,
    fontSize: '16px'
}));

const PriceWait = styled('span')( 
  () => ({
    fontSize: '12px',
    fontStyle: 'italic'
}));

const usePrice = coin => {

  const { quote, exchange } = useSelector( state => state.setting );

  const { trade } = useSelector( state => state.ws );

  const [ streamReady, setStreamReady ] = useState( false );

  const priceRef = useRef({ 
    buy: true, 
    value: '' 
  });

  const { buy, value } = priceRef.current;

  const calcPrice = useCallback( () => {

    let n = parseFloat( trade[coin.name].P ).toFixed(2);

    let withCommas = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return {
      buy : trade[coin.name].F === "1" ? true : false,
      value : withCommas
    }

  },[ 
    trade, 
    coin ]);

  useEffect ( () => {
    if( trade && trade[coin.name] ){

      priceRef.current = calcPrice();

      const { TSYM, M } = trade[coin.name];

      setStreamReady( 
        TSYM === quote && 
        M === exchange && 
        value ? true : false );
      
    }
  },[ 
    trade, 
    coin,
    quote,
    exchange,
    value,
    calcPrice ]);


  const CoinPrice = () => (
      <React.Fragment>
        { streamReady ? 
        <PriceBox >
          <PriceDiff 
            inc={ buy ? 'green' : 'red' }>
            {` ${ value } `}
          </PriceDiff> 
          { quote } 
        </PriceBox> : 
        <PriceWait>
          {` price `}
        </PriceWait> }
      </React.Fragment>
  );

  return CoinPrice;
    
}

export default usePrice;


