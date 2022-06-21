import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { connectCryptoEvents } from '../../actions/websocket';
import { changeSetting } from '../../actions/settings';

import usePrevious from '../../hooks/usePrevious';
import useHasChanged from '../../hooks/useHasChanged';
import useSingleSelect from '../../hooks/useSingleSelect';

const currency_list = [ "EUR",  "USD", "CHF", "GBP", "JPY", "CAD"];

const CurrencyList = ({
  changeSetting,
  connectCryptoEvents
}) => {

  const setting = useSelector( state => state.setting );

  const { coins } = useSelector( state => state.coin );

  const [ defaultValue, setDefaultValue ] = useState();

  const prevQuote = usePrevious( setting.quote );

  const [ state, SingleSelect, isEvent ] = useSingleSelect( 
    "Currency List",
    defaultValue, 
    currency_list 
  );

  const stateHasChanged = useHasChanged( state );

  useEffect( () => {
    if( setting.quote ){
      setDefaultValue( setting.quote );
    }
  }, [ setting ] );

  const connectList = useCallback( 
    ( action, exchange, quote ) => {
    connectCryptoEvents( 
      action,  
      coins.reduce( 
        ( a, b ) => [ 
            ...a, 
            `0~${exchange}~${b.name}~${quote}`, 
            `11~${b.name}`
        ], [] 
      )
    ); 
  }, [ coins, connectCryptoEvents ] );

  useEffect( () => {
    if( stateHasChanged && isEvent ) {
      let shallowSetting = Object.assign( {}, setting );
      shallowSetting.quote = state;
      changeSetting( shallowSetting )
      .then( res => {
        if( coins ) {
          connectList( 
            'SubRemove', 
            res.exchange, 
            prevQuote 
          );
          return res;
        }
      } )
      .then( res => {
        connectList( 
          'SubAdd', 
          res.exchange, 
          res.quote 
        );
      });
    }
  }, [  stateHasChanged,
        isEvent,
        state, 
        setting,
        prevQuote, 
        changeSetting, 
        coins,
        connectList ] );

  return <SingleSelect />    

};

const mapDispatchToProps = { 
  changeSetting,
  connectCryptoEvents
};

export default connect( null, mapDispatchToProps )( CurrencyList );