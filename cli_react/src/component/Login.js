import React from 'react';
import '../App.css';
import Header from './Header';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const handleClick = () => {
        const mail = document.getElementById('mail').value;
        const password = document.getElementById('pwd').value;

        if (mail && password) {
            const basicAuth = Buffer.from(
                `${mail}:${password}`,
                'utf8'
            ).toString('base64');
            login(basicAuth).then((token) => {
                if (token) {
                    sessionStorage.setItem('jwtToken', token);
                    console.log('jwtToken stored in browser session');
                }
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='login'>
                <div className='loginContainer'>
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
            </div>
        </div>
    );
};

async function login(basicAuth) {
    try {
        const response = await axios.post(
            `http://localhost:3001/user/login`,
            {},
            {
                headers: { authorization: `Basic ${basicAuth}` },
            }
        );
        return response.data.token;
    } catch (error) {
        console.log(error);
    }
}

export default Login;
