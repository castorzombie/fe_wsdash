import React, { useState, useEffect, useRef, useCallback }  from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';


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

const CoinDesc = styled('span')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 14px;
`,
);

const usePrice = coin => {

  const { quote } = useSelector( state => state.setting );

  const { trade, fullVolume } = useSelector( state => state.ws );

  const priceRef = useRef({ buy: true, value: '' });

  const volumeRef = useRef('');

  const [ volTip ] = useState(`How much ${quote} was paid in total for the volume of ${coin.description} traded`)

  const calcPrice = useCallback( () => {
    return {
      buy : trade[coin.name].F === "1" ? true : false,
      value : Math.round( trade[coin.name].P * 100 ) / 100
    }
  }, [ trade, coin.name ]);

  const calcVolume = useCallback( () => {
    return Math.round( fullVolume[coin.name].FULLVOLUME * 100 ) / 100 ;
  }, [ coin.name, fullVolume]);

  useEffect ( () => {
    if( trade && trade[coin.name] ){
      priceRef.current = calcPrice();
    }
  }, [ trade, coin, calcPrice ] );
  
  useEffect ( () => {
    if( fullVolume && fullVolume[coin.name] ){
      volumeRef.current = calcVolume();
    }
  }, [ fullVolume, coin, calcVolume ] );


  const subHeader = ( ) => {
    const { buy, value } = priceRef.current
    return(
      <React.Fragment>
        <CoinDesc>{coin.description}</CoinDesc>
        {value ? 
        <PriceBox >
          <PriceDiff inc={ buy ? 'green' : 'red' } >{` ${ value } `}</PriceDiff> 
          {quote} 
        </PriceBox> : 'Waiting for price ... ' }
        <span>{` (${volumeRef.current})` }</span>
        { /*<Tooltip title={volTip } placement="top-end" ><span>ii</span></Tooltip> */}
      </React.Fragment>
    )
  };

  const CoinPrice = () => (
    <CardHeader
      avatar={
        <Avatar
        alt={ coin.description }
        src={ coin.image }
        sx={{ width: 42, height: 42 }} />
      }
      title={ coin.name }
      subheader={ subHeader() }
    />
  );

  return CoinPrice;
    
}

export default usePrice;


