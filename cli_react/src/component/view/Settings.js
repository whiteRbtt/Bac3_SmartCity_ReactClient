import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { updateOwnPwd, uploadAvatar } from '../../services/api/User';
import { isLogged, isPasswordValid } from '../../services/Toolbox';
import {
    passwordSucces,
    passwordHelper,
    errorFetching,
    avatarSucces,
    imgTooLarge,
    missingAvatar,
    passwordsNotMatching,
    missingFields,
    apiErrors,
} from '../../services/string';
import '../../App.css';
import geralt from '../../services/img/geralt.png';
import Header from '../Header';

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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Settings = (props) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [avatar] = useState(props.location.avatar ? props.location.avatar : null);
    const [newAvatar, setNewAvatar] = useState();
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickPwd = async (e) => {
        e.preventDefault();
        console.log(`password`, password);
        console.log(`newPassword`, newPassword);
        console.log(`newPasswordConfirm`, newPasswordConfirm);
        if ((password !== '') && (newPassword !== '') && (newPasswordConfirm !== '')) {
            if (newPassword === newPasswordConfirm) {
                if (isPasswordValid(newPassword)) {
                    try {
                        await updateOwnPwd(password, newPassword);
                        setPassword('');
                        setNewPassword('');
                        setNewPasswordConfirm('');
                        setMessage(passwordSucces);
                    } catch (err) {
                        setMessage(apiErrors[err.response.data.error] ?? errorFetching);
                    }
                }
            } else setMessage(passwordsNotMatching);
        } else setMessage(missingFields);
    };

    const handleClickAvatar = async (e) => {
        e.preventDefault();
        if (newAvatar !== null) {
            if (newAvatar[0].size < 15000) {
                try {
                    const formData = new FormData();
                    for (const image of newAvatar) formData.append('avatar', image);
                    const res = await uploadAvatar(formData);
                    setNewAvatar(res.data.profilePicture);

                    setMessage(avatarSucces);
                } catch (err) {
                    setMessage(errorFetching);
                }
            } else setMessage(imgTooLarge);
        } else setMessage(missingAvatar);
    };

    return (
        <div>
            <Header />
            <div className='settingsColumns'>
                <div className='settingsContainer'>
                    <div className='passwordSettingContainer'>
                        <Typography variant='h5'>Modifier le mot de passe</Typography>

                        <FormControl className='passwordField'>
                            <InputLabel htmlFor='password'>Actuel</InputLabel>
                            <OutlinedInput
                                id='password'
                                label='Actuel'
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
                            <InputLabel htmlFor='password'>Nouveau</InputLabel>
                            <OutlinedInput
                                id='password'
                                label='Nouveau'
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                error={newPassword === '' ? null : !isPasswordValid(newPassword)}
                                helperText={
                                    newPassword === '' ? null : isPasswordValid(newPassword) ? null : passwordHelper
                                }
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
                            <InputLabel htmlFor='password'>Répetez nouveau</InputLabel>
                            <OutlinedInput
                                id='password'
                                label='Répetez nouveau'
                                type={showPassword ? 'text' : 'password'}
                                value={newPasswordConfirm}
                                onChange={(event) => setNewPasswordConfirm(event.target.value)}
                                error={newPasswordConfirm === '' ? null : !isPasswordValid(newPasswordConfirm)}
                                helperText={
                                    newPasswordConfirm === ''
                                        ? null
                                        : isPasswordValid(newPasswordConfirm)
                                        ? null
                                        : passwordHelper
                                }
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleClickShowPassword} edge='end'>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Button variant='outlined' onClick={handleClickPwd}>
                            modifier
                        </Button>
                    </div>

                    <div className='avatarSettingContainer'>
                        <Typography variant='h5'>Modifier l'avatar</Typography>

                        {
                            <img
                                src={typeof newAvatar === 'string' ? newAvatar : avatar ? avatar : geralt}
                                alt='avatar'
                                className='avatar'
                            />
                        }

                        <input
                            type={'file'}
                            accept={('image/png', 'image/jpeg')}
                            onChange={(e) => setNewAvatar(e.target.files)}
                            required
                        />
                        <Button variant='outlined' onClick={handleClickAvatar}>
                            modifier
                        </Button>
                    </div>
                </div>
                <Typography variant='h5' className='errorMessageSettings'>
                    {message}
                </Typography>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Settings;
