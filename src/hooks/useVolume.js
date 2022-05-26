import React, { useEffect, useRef, useCallback }  from 'react';
import { useSelector } from 'react-redux';

const useVolume = coin => {

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
      {` (${volumeRef.current})` }
    </React.Fragment>
  );

  return CoinVolume;
    
}

export default useVolume;

