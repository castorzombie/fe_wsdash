import React from 'react';
import Grid from '@mui/material/Grid';
import CoinList from '../panel/CoinList';
import CurrencyList from '../panel/CurrencyList';
import ExchangeList from '../panel/ExchangeList';

export default function DashPanel() {
  return (
    <Grid container spacing={ 0 } >
        <Grid item xs={ 12 } md={ 12 } lg={ 12 } >
            <CoinList />
        </Grid>
        <Grid item xs={ 12 } md={ 12 } lg={ 12 } >
            <ExchangeList />
        </Grid>   
        <Grid item xs={ 12 } md={ 12 } lg={ 12 } >
            <CurrencyList />
        </Grid>   
    </Grid>
  )
};
