
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/auth';
import { getSetting } from '../../actions/settings';
import { 
    Typography, 
    Grid,
    Box, 
    Paper, 
    Alert, 
    TextField, 
    CssBaseline, 
    Button, 
    Avatar } from '@mui/material';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const LogIn = ({
    userLogin,
    getSetting
}) => {

    const [ formElements, setFormElements ] = useState({
        email: '',
        password: ''
    });

    const [ msg, setMsg ] = useState('');

    const handleInputChange = ({ target }) => {

        setFormElements({
            ...formElements,
            [target.name]: target.value
        });

    };

    const { email, password } = formElements;

    const handleLogin = e => {

        e.preventDefault();

        userLogin( 
            email, 
            password 
        ).then( 
            res =>  { 

               if ( 'error' in res ) { 

                   handleError( res.error );

               } else {

                   getSetting( res.data.uid );

               }
                
            }
        );

    };

    const handleError = error => {

        if ( typeof error === 'string' ) {

            setMsg( error );

        } else {

           Object.values( error ).map( el => setMsg( el.msg ) );

        }

    };

    return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/SHDCQ1l2WD0)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ 
                            m: 1, 
                            bgcolor: '#8e99f3', 
                            fontSize:'.9rem' 
                        }}>
                        WS
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Log in
                        </Typography>
                        <Box component="form" noValidate onSubmit={ handleLogin } sx={{ mt: 1 }}>
                        <TextField
                            value={ email }
                            onChange={ handleInputChange  }
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            value={ password }
                            onChange={ handleInputChange }
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{backgroundColor: '#5c6bc0'}}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link  to="/signin" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                         { msg && <Alert style={{ marginTop:'10px' }} severity="error">{msg}</Alert> }
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
             </ThemeProvider>
    )
}

const mapDispatchToProps = { 
    userLogin,
    getSetting
}

export default connect( null, mapDispatchToProps )( LogIn );