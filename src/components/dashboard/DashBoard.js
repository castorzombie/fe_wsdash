import React, { useState,} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import {  
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Grid, 
  Avatar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';

import DashPanel from './DashPanel';
import Dashdata from './Dashdata';


const drawerWidth = 340;

const DashBar = styled( AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#5c6bc0',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DashDrawer = styled( Drawer, { shouldForwardProp: prop => prop !== 'open' } )(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...( !open && {
        overflowX: 'hidden',
        transition: theme.transitions.create( 'width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing( 0 ),
        [theme.breakpoints.up( 'sm' )]: {
          width: theme.spacing( 0 )
        }
      })
    }
  })
);

const mdTheme = createTheme();

function DashboardContent() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState( true );

  const { exchange, quote } = useSelector( state => state.setting );
    

  const toggleDrawer = () => {

    setOpen(!open);

  };

  const handleLogout = () => {

      dispatch( 
        startLogout() 
      );
      
  };

  return (
    <ThemeProvider theme={ mdTheme } >
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <DashBar position="absolute" open={ open } >
          <Toolbar sx={{ pr: '24px' }} >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={ toggleDrawer }
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              { `${exchange} (${quote})` }
            </Typography>
            <IconButton
              color="inherit"
              onClick={ handleLogout } >
                <LogoutIcon />
            </IconButton>
          </Toolbar>
        </DashBar>
        <DashDrawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
            }}
          >
            <Avatar sx={{
              m: 1, 
              bgcolor: '#8e99f3', 
              fontSize:'.9rem',
              marginLeft: '10px'
             }}>WS</Avatar>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
              <DashPanel />
              </Grid>
            </Grid>
        </DashDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
            <Dashdata />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const DashBoard = () => {
  return <DashboardContent />;
};