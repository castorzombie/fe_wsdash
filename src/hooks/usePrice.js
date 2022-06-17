import React, { useEffect, useRef, useCallback }  from 'react';
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

  const { quote } = useSelector( state => state.setting );

  const { trade } = useSelector( state => state.ws );

  const priceRef = useRef({ 
    buy: true, 
    value: '' 
  });

  const calcPrice = useCallback( () => {

    return {
      buy : trade[coin.name].F === "1" ? true : false,
      value : Math.round( trade[coin.name].P * 100 ) / 100
    }

  },[ 
    trade, 
    coin.name ]);


  useEffect ( () => {

    if( trade && trade[coin.name] ){

      priceRef.current = calcPrice();

    }
  },[ 
    trade, 
    coin, 
    calcPrice ]);

  const { buy, value } = priceRef.current;

  const CoinPrice = () => (
      <React.Fragment>
        { value ? 
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


