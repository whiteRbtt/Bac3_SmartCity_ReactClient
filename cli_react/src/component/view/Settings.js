import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { updateOwnPwd, uploadAvatar } from '../../services/api/User';
import { isLogged, isPasswordValid } from '../../services/Toolbox';
import { pwdError, pwdSucces, minMaxCharNeeded, errorFetching, avatarSucces, imgTooLarge } from '../../services/string';
import '../../App.css';
import geralt from '../../geralt.png';
import Header from '../Header';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Settings = (props) => {
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newPwdConf, setNewPwdConf] = useState('');
    const [message, setMessage] = useState('');
    const [avatar, setAvatar] = useState(props.location.state ? props.location.state.avat : null);
    const [newAvatar, setNewAvatar] = useState();

    const handleClickPwd = async (e) => {
        e.preventDefault();

        if ((newPwd === newPwdConf) & isPasswordValid(newPwd)) {
            try {
                await updateOwnPwd(oldPwd, newPwd);
                setOldPwd('');
                setNewPwd('');
                setNewPwdConf('');
                setMessage(pwdSucces);
            } catch (err) {
                setMessage(pwdError);
                console.error(err);
            }
        }
    };

    const handleClickAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const image of newAvatar) formData.append('avatar', image);
        try {
            await uploadAvatar(formData);
            setMessage(avatarSucces);
        } catch (err) {
            err.response.status !== 418 ? setMessage(imgTooLarge) : setMessage(errorFetching);
        }
    };

    return (
        <div>
            <Header />
            <div className='settingsContainer'>
                <div className='subSettingContainer'>
                    <Typography variant='h7' gutterBottom component='div'>
                        Modifier le mot de passe
                    </Typography>
                    <TextField label='Actuel' value={oldPwd} onChange={(event) => setOldPwd(event.target.value)} />

                    <TextField
                        label='Nouveau'
                        value={newPwd}
                        onChange={(event) => setNewPwd(event.target.value)}
                        error={newPwd === '' ? null : !isPasswordValid(newPwd)}
                        helperText={newPwd === '' ? null : isPasswordValid(newPwd) ? null : minMaxCharNeeded}
                    />

                    <TextField
                        label='Répetez nouveau'
                        value={newPwdConf}
                        onChange={(event) => setNewPwdConf(event.target.value)}
                        error={newPwdConf === '' ? null : !isPasswordValid(newPwdConf)}
                        helperText={newPwdConf === '' ? null : isPasswordValid(newPwdConf) ? null : minMaxCharNeeded}
                    />

                    <Button variant='outlined' onClick={handleClickPwd}>
                        modifier
                    </Button>
                </div>

                <div className='subSettingContainer'>
                    {avatar ? (
                        <img src={avatar} alt='avatar' className='tilesImg' />
                    ) : (
                        <img src={geralt} alt='avatar' className='tilesImg' />
                    )}
                    <Typography variant='h7' gutterBottom component='div'>
                        Modifier avatar
                    </Typography>
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
            <Typography variant='h7' gutterBottom component='div'>
                {message}
            </Typography>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Settings;
