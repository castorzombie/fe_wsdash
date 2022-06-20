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


