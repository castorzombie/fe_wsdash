import React, { useEffect, useState, useRef, useCallback }  from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const VolumeWait = styled('span')( 
  () => ({
    fontSize: '12px',
    fontStyle: 'italic'
}));

const useVolume =  ( coin, quote ) => {

  const { fullVolume } = useSelector( state => state.ws );

  const volumeRef = useRef('');

  const calcVolume = useCallback( () => {

    return Math.round( fullVolume[coin.name].FULLVOLUME * 100 ) / 100 ;

  },[ 
    coin.name, 
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
      { volumeRef.current ? ` (${volumeRef.current}${quote})` :
      <VolumeWait>{` (volume) `}</VolumeWait> }
    </React.Fragment>
  );

  return CoinVolume;
    
}

export default useVolume;


