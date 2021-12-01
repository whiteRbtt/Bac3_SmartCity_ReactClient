import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../../services/api/User';
import '../../App.css';
import {
    mailNotValid,
    passwordMinMaxChar,
    missingFields,
    errorFetching,
    squalala,
    nameNotValid,
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
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(typeof(date) === "object")
            setDate(`${date.getFullYear() - 18}-${date.getMonth() + 1}-${date.getDate()}`);
    }, []);



    const handleClick = async (e) => {
        e.preventDefault();
        if (typeof date === 'object')  setDate(transformDate(date));
        if (
            isEmailValid(mail) &
            isNameValid(name) &
            isPasswordValid(password) &
            isPasswordValid(pwdConfirm) &
            isBirthDateValid(date)
        ) {
            try {
                await register(mail, password, name, date);
                await persistUser();
                setMessage(squalala);
            } catch (err) {
                setMessage(errorFetching);
                console.error(err);
            }
        } else setMessage(missingFields);
    };    

    return (
        <div className='centerBoxContainer'>
            <div className='registerContainer'>
                <Typography variant='8' className='errorMessage'>
                    {message}
                </Typography>
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
                    helperText={password === '' ? null : isPasswordValid(password) ? null : passwordMinMaxChar}
                />

                <TextField
                    label='Confirmez mot de passe'
                    value={pwdConfirm}
                    onChange={(event) => setPwdConfirm(event.target.value)}
                    error={pwdConfirm === '' ? null : !isPasswordValid(pwdConfirm)}
                    helperText={pwdConfirm === '' ? null : isPasswordValid(pwdConfirm) ? null : passwordMinMaxChar}
                />

                <DesktopDatePicker
                    label='Date de naissance'
                    value={date}
                    minDate={new Date('1920-01-01')}
                    maxDate={new Date(date)}
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
            {isLogged() ? <Redirect to='/' /> : null}
        </div>
    );
};

export default Register;
