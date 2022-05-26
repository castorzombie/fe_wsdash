import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import usePrice from '../../hooks/usePrice';
import useVolume from '../../hooks/useVolume';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const CoinDesc = styled('span')(
  ({ theme }) => `
    color: ${theme.palette.text.secondary};
    display: inline;
    font-size: 14px;
    `,
);

const CoinIcon = styled(InfoIcon)`
  font-size: 16px;
  color: #1976d2;
`;

export default function DashRealTime({ coin }) {

  const { quote } = useSelector( state => state.setting );

  const [ volTip ] = useState(`How much ${quote} was paid in total for the volume of ${coin.description} traded`);

  const CoinPrice = usePrice( coin );

  const CoinVolume = useVolume( coin );

  const subHeader = () => {
    return(
      <React.Fragment>
        <CoinDesc>
          {coin.description}
        </CoinDesc>
        <CoinPrice />
        <CoinVolume />
        { <Tooltip 
            title={ volTip } 
            placement="top-end" >
              <CoinIcon />
          </Tooltip> }
      </React.Fragment>
    )
  };
  
  return (
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
  )
  
}