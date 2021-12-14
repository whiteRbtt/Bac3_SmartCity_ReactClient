import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../../services/api/User';
import '../../App.css';
import {
    mailNotValid,
    passwordHelper,
    missingFields,
    errorFetching,
    squalala,
    nameNotValid,
    apiErrors,
    passwordsNotMatching,
    cannotReachServer
} from '../../services/string';
import {
    transformDate,
    persistUser,
    isEmailValid,
    isPasswordValid,
    isLogged,
    isBirthDateValid,
    isNameValid,
} from '../../services/Toolbox';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Button, TextField, Typography } from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [date, setDate] = useState('');
    const [maxDate, setMaxDate] = useState(new Date());
    const [message, setMessage] = useState('');

    useEffect(() => {
        const today = new Date()
        setMaxDate(new Date(`${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate()}`));
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();

        if (
            isEmailValid(mail) &
            isNameValid(name) &
            isPasswordValid(password) &
            password === pwdConfirm &
            isBirthDateValid(date)
        ) {
            try {
                await register(mail, password, name, transformDate(date));
                await persistUser();
                setMessage(squalala);
            } catch (err) {
                setMessage(err.response ? apiErrors[err.response.data.error] ?? errorFetching : cannotReachServer);
            }
        } else setMessage(password !== pwdConfirm ? passwordsNotMatching : missingFields);
    };    

    return (
        <div className='centerBoxContainer'>
            <div className='registerContainer'>
                <TextField
                    label='Nom'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    error={name === '' ? null : !isNameValid(name)}
                    helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
                />
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

                <TextField
                    label='Confirmez mot de passe'
                    value={pwdConfirm}
                    onChange={(event) => setPwdConfirm(event.target.value)}
                    error={pwdConfirm === '' ? null : !isPasswordValid(pwdConfirm)}
                    helperText={pwdConfirm === '' ? null : isPasswordValid(pwdConfirm) ? null : passwordHelper}
                />

                <DesktopDatePicker
                    label='Date de naissance'
                    value={date === '' ? maxDate : date}
                    minDate={new Date('1920-01-01')}
                    maxDate={maxDate}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button variant='contained' onClick={handleClick}>
                    Inscription
                </Button>
                <Typography variant='body2' className='errorMessage'>
                    <Link to={`/Connexion`} className='registerLink'>
                        Connexion
                    </Link>
                </Typography>
            </div>
            <Typography variant='body 2' className='whiteNeon' style={{ marginTop: 50, marginBottom:50 }}>
                {message}
            </Typography>
            {isLogged() ? <Redirect to='/' /> : null}
        </div>
    );
};

export default Register;
