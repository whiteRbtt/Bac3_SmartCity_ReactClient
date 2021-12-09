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
    credentialNotValid,
    errorFetching,
    missingFields,
    squalala,
} from '../../services/string';

import { Button, Typography, TextField } from '@mui/material';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        if (isEmailValid(mail) & isPasswordValid(password)) {
            try {
                await login(mail, password);
                await persistUser();
                setMessage(squalala)
            } catch (err) {
                err.response.status !== 500 ? setMessage(credentialNotValid) : setMessage(errorFetching);
            }
        } else setMessage(missingFields);
    };

    return (
        <div className='centerBoxContainer'>
            <Typography variant='8' className='errorMessage'>
                {message}
            </Typography>
            <div className='loginContainer'>
                <TextField
                    label='Email'
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                    error={mail === '' ? null : !isEmailValid(mail)}
                    helperText={mail === '' ? null : isEmailValid(mail) ? null : mailNotValid}
                />

                <TextField
                    label='Mot de passe'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={password === '' ? null : !isPasswordValid(password)}
                    helperText={password === '' ? null : isPasswordValid(password) ? null : passwordHelper}
                />

                <Button variant='contained' onClick={handleClick}>
                    Connexion
                </Button>

                <Link to={`/inscription`} className='registerLink'>
                    Inscription
                </Link>
            </div>
            {isLogged() ? <Redirect to='/' /> : null}
        </div>
    );
};

export default Login;
