import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { transformDate, persistUser } from '../../services/Toolbox';
import { register } from '../../services/api/User';
import '../../App.css';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Register = () => {
    const [date, setDate] = React.useState(new Date());
    const [isErrorHidden, setIsErrorHidden] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        const mail = document.getElementById('registerMail').value;
        const name = document.getElementById('registerName').value;
        const password = document.getElementById('registerPwd').value;
        const pwdConfirm = document.getElementById('registerPwdRepeat').value;
        const birthDate = transformDate(date);

        if (!mail || !name) {
            setIsErrorHidden(false);
            setErrorMessage('Champs manquants');
        } else if (password !== pwdConfirm) {
            setIsErrorHidden(false);
            setErrorMessage('Mots de passe différents');
        } else {
            try {
                await register(mail, password, name, birthDate);
                await persistUser();
                setIsRegisterSuccess(true);
            } catch (err) {
                setIsErrorHidden(false);
                setErrorMessage(err.response.data.error);
            }
        }
    };

    return (
        <div>
            <div className='register'>
                <div className='registerContainer'>
                    <label hidden={isErrorHidden} id='errorMessage'>
                        {errorMessage}
                    </label>
                    <TextField
                        id='registerName'
                        label='Nom'
                        variant='outlined'
                    />
                    <TextField
                        id='registerMail'
                        label='Mail'
                        variant='outlined'
                    />
                    <TextField
                        id='registerPwd'
                        label='Mot de passe'
                        variant='outlined'
                    />
                    <TextField
                        id='registerPwdRepeat'
                        label='Répetez mot de passe'
                        variant='outlined'
                    />
                    <DesktopDatePicker
                        label='Date de naissance'
                        value={date}
                        minDate={new Date('1920-01-01')}
                        disableFuture
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant='contained' onClick={handleClick}>
                        Inscription
                    </Button>
                    <Link to={`/Connexion`} className='registerLink'>
                        Connexion
                    </Link>
                </div>
                {isRegisterSuccess ? <Redirect to='/' /> : null}
            </div>
        </div>
    );
};

export default Register;
