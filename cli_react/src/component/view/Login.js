import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import { login } from '../../services/api/User';
import {
    persistUser,
    isEmailValid,
    isPasswordValid,
} from '../../services/Toolbox';
import {
    mailNotValid,
    minMaxCharNeeded,
    loginError,
    errorFetching,
    missingFields,
} from '../../services/string';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = React.useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!mail || !password) {
            setMessage(missingFields);
        }
        else if (!isEmailValid(mail)) {
            setMessage(mailNotValid);
        }
        else if (!isPasswordValid(password)) {
            setMessage(minMaxCharNeeded);
        }
        else {
            try {
                await login(mail, password);
                await persistUser();
                setIsLogged(true);
            } catch (err) {
                err.response.status !== 500
                    ? setMessage(loginError)
                    : setMessage(errorFetching);
            }
        }

    };

    return (
        <div>
            <div className='login'>
                <div className='loginContainer'>
                    {message}

                    <TextField
                        label='Email'
                        value={mail}
                        onChange={(event) => setMail(event.target.value)}
                        error={mail === '' ? null : !isEmailValid(mail)}
                        helperText={
                            mail === ''
                                ? null
                                : isEmailValid(mail)
                                ? null
                                : mailNotValid
                        }
                    />

                    <TextField
                        label='Mot de passe'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={
                            password === '' ? null : !isPasswordValid(password)
                        }
                        helperText={
                            password === ''
                                ? null
                                : isPasswordValid(password)
                                ? null
                                : minMaxCharNeeded
                        }
                    />

                    <Button variant='contained' onClick={handleClick}>
                        Connexion
                    </Button>

                    <Link to={`/inscription`} className='registerLink'>
                        Inscription
                    </Link>
                </div>
                {isLogged ? <Redirect to='/' /> : null}
            </div>
        </div>
    );
};

export default Login;
