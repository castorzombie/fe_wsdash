import React from 'react';
import { useSelector } from 'react-redux';
import DashHistorical from './DashHistorical';
import DashRealTime from './DashRealTime';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper
} from '@mui/material';

const StyledAccordion = styled(Accordion)( ({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.secondary,
  padding: '0'
}));

const StyledAccordionDetails = styled(AccordionDetails)( () => ({
  padding: '0'
}));

const StyledCardContent = styled(CardContent)( () => ({
  padding: '0 0 0px 10px'
}));

const styleDashBox = {
  width: 'auto', 
  minHeight: 'calc(100% - 100px)',
  padding: '10px 0 0 10px'
};

function DashData() {

  const { coins } = useSelector( state => state.coin );

  const calcColumns = () => {
    return  coins.length > 2 ? 3 : coins.length;
  };

  return (
    <Box sx={ styleDashBox } >
      <Masonry 
        columns={ calcColumns() } 
        spacing={ 1 } >
        { coins.map( coin => ( 
          <React.Fragment key={ coin.itemId } >
            <Paper>
              <Card>
                <StyledAccordion >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}>
                    <DashRealTime coin={ coin } /> 
                  </AccordionSummary>
                  <StyledAccordionDetails>
                    <StyledCardContent>
                      <DashHistorical coin={ coin } />
                    </StyledCardContent>
                  </StyledAccordionDetails>
                </StyledAccordion>
              </Card>
            </Paper>
          </React.Fragment> 
        ) ) }
      </Masonry>
    </Box>
  )
}

export default DashData;