import React from 'react';

import usePrice from '../../hooks/usePrice';

export default function DashPrice({ coin }) {

  const CoinPrice = usePrice( coin );
  
  return <CoinPrice />
  
}