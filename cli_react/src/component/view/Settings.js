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
    passwordNotValid,
} from '../../services/string';
import '../../App.css';
import geralt from '../../services/img/geralt.png';
import Header from '../Header';

import { Typography, TextField, Button } from '@mui/material';

const Settings = (props) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [avatar] = useState(props.location.avatar ? props.location.avatar : null);
    const [newAvatar, setNewAvatar] = useState();
    const [message, setMessage] = useState('');


    const handleClickPwd = async (e) => {
        e.preventDefault();
        if ((password !== '') & (newPassword !== '') & (newPasswordConfirm !== '')) {
            if (newPassword === newPasswordConfirm) {
                if (isPasswordValid(newPassword)) {
                    try {
                        await updateOwnPwd(password, newPassword);
                        setPassword('');
                        setNewPassword('');
                        setNewPasswordConfirm('');
                        setMessage(passwordSucces);
                    } catch (err) {
                        err.response.status === 401 ? setMessage(passwordNotValid) : setMessage(errorFetching);
                        console.error(err);
                    }
                } else setMessage(passwordHelper);
            } else setMessage(passwordsNotMatching);
        } else setMessage(missingFields);
    };

    const handleClickAvatar = async (e) => {
        e.preventDefault();
        if (newAvatar !== null) {
            try {
                const formData = new FormData();
                for (const image of newAvatar) formData.append('avatar', image);
                const res = await uploadAvatar(formData);
                setNewAvatar(res.data.profilePicture); // TODO possible memory leak
                setMessage(avatarSucces);
            } catch (err) {
                console.error(err);
                if (err.response) err.response.status === 413 ? setMessage(imgTooLarge) : setMessage(errorFetching);
            }
        } else setMessage(missingAvatar);
    };

    return (
        <div>
            <Header />
            <div className='settingsColumns'>
                <div className='settingsContainer'>
                    <div className='passwordSettingContainer'>
                        <Typography variant='h5'>Modifier le mot de passe</Typography>

                        <TextField
                            label='Actuel'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <TextField
                            label='Nouveau'
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            error={newPassword === '' ? null : !isPasswordValid(newPassword)}
                            helperText={
                                newPassword === '' ? null : isPasswordValid(newPassword) ? null : passwordHelper
                            }
                        />

                        <TextField
                            label='Répetez nouveau'
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
                        />

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
