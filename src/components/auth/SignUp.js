
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../actions/auth';
import { createSetting } from '../../actions/settings';
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

const SignUp = ({
    userRegister,
    createSetting
}) => {

    const initialValues = { 
        name: '',
        email: '',
        password: '',
        password2: ''
    };

    const [ signupElements, setSignupElements ] = useState( initialValues );

    const [ msg, setMsg ] = useState('');

    const { name, email, password, password2 } = signupElements;

    const handleInputChange = ({ target }) => {

        setSignupElements({
            ...signupElements,
            [target.name]: target.value
        });

    };

    const handleSignup = e => {
        e.preventDefault();
        userRegister( 
            name, 
            email, 
            password 
        ).then( 
            res => { 
                if ('error' in res ) {
                    handleError( res.error );
                } else {
                    createSetting({
                        exchange: 'Coinbase',
                        quote: 'EUR'
                    });
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
            <Grid container  component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/G8FMqamIG90)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Grid container  justifyContent="center" alignItems="center">
                        <Grid item xs={10} sm={9} md={8} >
                        <Box
                            sx={{
                            my: 8,
                            mx: 2,
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
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={ handleSignup } sx={{ mt: 1 }}>
                            <TextField
                                value={ name }
                                onChange={ handleInputChange  }
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="User Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
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
                                autoComplete="password"
                            />
                            <TextField
                                value={ password2 }
                                onChange={ handleInputChange }
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label="Password Repeat"
                                type="password"
                                id="password2"
                                autoComplete="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: '#5c6bc0' }}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link  to="/login" variant="body2">
                                    {"Do have an account? Log In"}
                                </Link>
                                </Grid>
                            </Grid>
                            { msg && <Alert style={{ marginTop:'10px' }} severity="error">{msg}</Alert> }
                            </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}


const mapDispatchToProps = { 
    userRegister,
    createSetting
}

export default connect( null, mapDispatchToProps )( SignUp );