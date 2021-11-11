import React from 'react';
import { useState } from 'react';
import '../App.css';
import Header from './Header';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [isErrorHidden, setIsErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const fetchToken = async (basicAuth) => {
        await axios
            .post(
                `http://localhost:3001/user/login`,
                {},
                {
                    headers: { authorization: `Basic ${basicAuth}` },
                }
            )
            .then((res) => {
                const token = res.data.token;
                sessionStorage.setItem('jwtToken', token);
                setIsLogged(true);
                console.log('jwtToken stored in browser session');
            })
            .catch((err) => {
                setIsErrorHidden(false);
                setErrorMessage(err.response.data.error);
            });
    };

    const handleClick = () => {
        const mail = document.getElementById('mail').value;
        const password = document.getElementById('pwd').value;

        if (mail && password) {
            const basicAuth = Buffer.from(
                `${mail}:${password}`,
                'utf8'
            ).toString('base64');
            fetchToken(basicAuth);
        }
    };

    return (
        <div>
            <Header />
            <div className='login'>
                <div className='loginContainer'>
                    <label hidden={isErrorHidden} id='errorMessage'>
                        {errorMessage}
                    </label>
                    <TextField id='mail' label='Mail' variant='outlined' />
                    <TextField
                        id='pwd'
                        label='Mot de passe'
                        variant='outlined'
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
