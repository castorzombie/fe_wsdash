import React, { useState, useEffect }  from 'react';
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

  const { trade, fullVolume } = useSelector( state => state.ws );

  const { quote } = useSelector( state => state.setting );

  const [ volume, setVolume ] = useState();

  const [ price, setPrice ] = useState({
    buy: true,
    value: ''
  });

  const [ volTip ] = useState(`How much ${quote} was paid in total for the volume of ${coin.description} traded`)

  useEffect ( () => {
    if( trade && trade[coin.name] ){
      setPrice({
          buy : trade[coin.name].F === "1" ? true : false,
          value : Math.round( trade[coin.name].P * 100 ) / 100
      });
    }
  }, [ trade, price.value, coin, setPrice ] );

  
  useEffect ( () => {
    if( fullVolume && fullVolume[coin.name] ){
      setVolume( Math.round( fullVolume[coin.name].FULLVOLUME * 100 ) / 100 );
    }
  }, [  fullVolume, coin, setVolume ] );


  const subHeader = ( coin, price, volume ) => {
    return(
      <React.Fragment>
        <CoinDesc>{coin.description}</CoinDesc>
        {price.value ? 
        <PriceBox >
          <PriceDiff inc={ price.buy ? 'green' : 'red' } >{` ${ price.value } `}</PriceDiff> 
          {quote} 
        </PriceBox> : 'Waiting for price ... ' }
        <span>{` (${volume})` }</span>
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
      subheader={ subHeader( coin, price, volume ) }
    />
  );

  return CoinPrice;
    
}

export default usePrice;


