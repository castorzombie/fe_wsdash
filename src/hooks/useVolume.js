import React, { useEffect, useRef, useCallback }  from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const VolumeWait = styled('span')( 
  () => ({
    fontSize: '12px',
    fontStyle: 'italic'
}));

const useVolume = coin => {

  const { fullVolume } = useSelector( state => state.ws );

  const volumeRef = useRef('');

  const calcVolume = useCallback( () => {

    let n = parseFloat( fullVolume[coin.name].FULLVOLUME ).toFixed(2);

    let withCommas = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return withCommas ;

  },[ 
    coin, 
    fullVolume ]);

  
  useEffect ( () => {

    if( fullVolume && fullVolume[coin.name] ){

      volumeRef.current = calcVolume();

    }

  },[ 
    fullVolume, 
    coin, 
    calcVolume ] );
    

  const CoinVolume = () => (
    <React.Fragment>
      <VolumeWait>
      { volumeRef.current ? 
      ` (${volumeRef.current})` :
      ` (volume) ` }
      </VolumeWait> 
    </React.Fragment>
  );

  return CoinVolume;
    
}

export default useVolume;


