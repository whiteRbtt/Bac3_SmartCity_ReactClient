import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import { login } from '../../services/api/User';
import { persistUser } from '../../services/Toolbox';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [isErrorHidden, setIsErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        const mail = document.getElementById('mail').value;
        const password = document.getElementById('pwd').value;

        if (mail && password) {
            try {
                await login(mail, password).then(() => {
                    setIsLogged(true);
                });
                await persistUser();
            } catch (e) {
                setIsErrorHidden(false);
                if (e.response) setErrorMessage(e.response.data.error);
                else {
                    setErrorMessage('Veuillez réessayer plus tard');
                }
            }
        }
    };

    return (
        <div>
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
