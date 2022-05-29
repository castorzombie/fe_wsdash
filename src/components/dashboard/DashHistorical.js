import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historicalPair } from '../../actions/crypto'; 
import { historicalPairMock } from '../../mocks/historicalPairMock';
import useChart from '../../hooks/useChart';

export default function DashHistorical({ coin }) {

  const dispatch = useDispatch();

  const { quote } = useSelector( state => state.setting );

  const [ chartData, setChartData ] = useState( [] );

  const CoinChart = useChart( chartData, coin.name );

  useEffect( () => {
   /* dispatch(
      historicalPair( { 
        period: "day", 
        coin: coin.name, 
        quote: quote,
        limit: "500"   
      } )
    )*/
    historicalPairMock().then( res => {
      if( res.Data ){
        setChartData(res.Data.Data);
      }
    })
  },[ coin, dispatch, quote ]);
  
  return <CoinChart />

}