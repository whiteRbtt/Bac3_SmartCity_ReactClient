import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import { login } from '../../services/api/User';
import {
    persistUser,
    isEmailValid,
    isPasswordValid,
    isLogged,
} from '../../services/Toolbox';
import {
    mailNotValid,
    passwordHelper,
    apiErrors,
    errorFetching,
    missingFields,
    squalala,
    cannotReachServer,
} from '../../services/string';

import {
    Button,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    

    const handleClick = async (e) => {
        e.preventDefault();

        if (isEmailValid(mail) && isPasswordValid(password)) {
            try {
                await login(mail, password);
                await persistUser();
                setMessage(squalala)
            } catch (err) {
                setMessage(err.response ? apiErrors[err.response.data.error] ?? errorFetching : cannotReachServer);
            }
        } else setMessage(missingFields);
    };

    return (
        <div className='centerBoxContainer'>
            <div className='loginContainer'>
                <TextField
                    label='Email'
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                    error={mail === '' ? null : !isEmailValid(mail)}
                    helperText={mail === '' ? null : isEmailValid(mail) ? null : mailNotValid}
                />

                <FormControl className='passwordField'>
                    <InputLabel htmlFor='password'>Mot de passe</InputLabel>
                    <OutlinedInput
                        id='password'
                        label='Mot de passe'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={password === '' ? null : !isPasswordValid(password)}
                        helperText={password === '' ? null : isPasswordValid(password) ? null : passwordHelper}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleClickShowPassword} edge='end'>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button variant='contained' onClick={handleClick}>
                    Connexion
                </Button>

                <Typography variant='body2' className='errorMessage'>
                    <Link to={`/inscription`} className='registerLink'>
                        Inscription
                    </Link>
                </Typography>
            </div>
            <Typography variant='body 2' className='whiteNeon' style={{ marginTop: 50 }}>
                {message}
            </Typography>
            {isLogged() ? <Redirect to='/' /> : null}
        </div>
    );
};

export default Login;
