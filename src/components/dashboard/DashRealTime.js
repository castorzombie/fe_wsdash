import React, { useState } from 'react';
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
  font-size: 14px;
  color: #1976d2;
  margin: 0 0 -3px 3px;
`;

export default function DashRealTime({ coin }) {

  const { description, image, name } = coin;

  const [ volTip ] = useState(`24 hour volume aggregated across all markets and all exchanges in ${name}.`);

  const CoinPrice = usePrice( coin );

  const CoinVolume = useVolume( coin );



  const subHeader = () => {
    return(
      <React.Fragment>
        <CoinDesc>
          {description}
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
          alt={ description }
          src={ image }
          sx={{ width: 42, height: 42 }} />
      }
      title={ name }
      subheader={ subHeader() }
    />
  )
  
}