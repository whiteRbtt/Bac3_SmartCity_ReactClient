import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../../services/api/User';
import '../../App.css';
import {
    mailNotValid,
    minMaxCharNeeded,
    strBlankError,
    missingFields,
    ageMin,
    samePwd,
    registerSucces,
    errorFetching,
} from '../../services/string';
import {
    transformDate,
    persistUser,
    isEmailValid,
    isPasswordValid,
    strNotBlank,
    birthDateValidation,
} from '../../services/Toolbox';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Register = () => {
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pwdConfirm, setPwdConfirm] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [message, setMessage] = React.useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        const birthDate = transformDate(date);

        if (!mail || !name || !password || !pwdConfirm || !date) {
            setMessage(missingFields);
        } else if (!strNotBlank(name)) {
            setMessage(strBlankError);
        } else if (!isEmailValid(mail)) {
            setMessage(mailNotValid);
        } else if (!isPasswordValid(password) || !isPasswordValid(pwdConfirm)) {
            setMessage(minMaxCharNeeded);
        } else if (password !== pwdConfirm) {
            setMessage(samePwd);
        } else if (!birthDateValidation(birthDate)) {
            setMessage(ageMin);
        } else {
            try {
                await register(mail, password, name, birthDate);
                await persistUser()
                setMessage(registerSucces);
                setIsRegisterSuccess(true);
            } catch (err) {
                setMessage(errorFetching);
            }
        }
    };

    return (
        <div>
            <div className='register'>
                <div className='registerContainer'>
                    {message}
                    <TextField
                        label='Nom'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        error={name === '' ? null : !strNotBlank(name)}
                        helperText={
                            name === ''
                                ? null
                                : strNotBlank(name)
                                ? null
                                : strBlankError
                        }
                    />
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

                    <TextField
                        label='Confirmez mot de passe'
                        value={pwdConfirm}
                        onChange={(event) => setPwdConfirm(event.target.value)}
                        error={
                            pwdConfirm === ''
                                ? null
                                : !isPasswordValid(pwdConfirm)
                        }
                        helperText={
                            pwdConfirm === ''
                                ? null
                                : isPasswordValid(pwdConfirm)
                                ? null
                                : minMaxCharNeeded
                        }
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
