import React, { useState, useEffect }  from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import useHasChanged from './useHasChanged';

const useChart = chartData => {

  const [ OHLC, setOHLC ] = useState( [] );

  const [ volCoin, setVolCoin ] = useState( [] );

  const stateHasChanged = useHasChanged( chartData );

  useEffect( () => {
        if( chartData && stateHasChanged ){
            const ohlc = chartData.map( el => [ el.time*1000, el.open, el.high, el.low, el.close ] );
            const vol = chartData.map( el => [ el.time*1000, el.volumefrom ] );
            setOHLC( ohlc );
            setVolCoin( vol );
        }
  },[ chartData, stateHasChanged ] );

  const groupingUnits = [[
      'week',
      [1]
    ], [
      'month',
      [1, 2, 3, 4, 6]
  ]];

  const CoinChart = () => (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={ 
        {
          
          rangeSelector: {
            selected: 1
          },
      
          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
              enabled: true
            }
          }, {
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
          }],
      
          tooltip: {
            split: true
          },
      
          series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: OHLC,
            dataGrouping: {
              units: groupingUnits
            }
          }, {
            type: 'column',
            name: 'Volume',
            data: volCoin,
            yAxis: 1,
            dataGrouping: {
              units: groupingUnits
            }
          }]

        } 
      } 
    /> 
  );

  return CoinChart;
    
}

export default useChart;


