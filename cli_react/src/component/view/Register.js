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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

const Register = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [date, setDate] = useState('');
    const [maxDate, setMaxDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const today = new Date()
        setMaxDate(new Date(`${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate()}`));
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (
            isEmailValid(mail) &&
            isNameValid(name) &&
            isPasswordValid(password) &&
            password === pwdConfirm &&
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

                <FormControl className='passwordField'>
                    <InputLabel htmlFor='password'>Confirmez mot de passe</InputLabel>
                    <OutlinedInput
                        id='password'
                        label='Confirmez mot de passe'
                        type={showPassword ? 'text' : 'password'}
                        value={pwdConfirm}
                        onChange={(event) => setPwdConfirm(event.target.value)}
                        error={pwdConfirm === '' ? null : !isPasswordValid(pwdConfirm)}
                        helperText={pwdConfirm === '' ? null : isPasswordValid(pwdConfirm) ? null : passwordHelper}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleClickShowPassword} edge='end'>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

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
            <Typography variant='body 2' className='whiteNeon' style={{ marginTop: 50, marginBottom: 50 }}>
                {message}
            </Typography>
            {isLogged() ? <Redirect to='/' /> : null}
        </div>
    );
};

export default Register;
