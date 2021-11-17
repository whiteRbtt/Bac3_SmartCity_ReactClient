import React from 'react';
import { Redirect } from 'react-router-dom';

import { updateOwnPwd } from '../../services/api/User';
import { isLogged, isStrValid } from '../../services/Toolbox';
import '../../App.css';
import Header from '../Header';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Settings() {
    const handleClickPwd = async (e) => {
        e.preventDefault();
        const oldPwd = document.getElementById('oldPwd').value;
        const newPwd = document.getElementById('newPwd').value;

        if (isStrValid(newPwd)) {
            await updateOwnPwd(oldPwd, newPwd)
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
                    <TextField id='oldPwd' label='actuel' variant='outlined' />
                    <TextField id='newPwd' label='nouveau' variant='outlined' />
                    <Button variant='outlined' onClick={handleClickPwd}>
                        modifier
                    </Button>
                </div>

                <div className='subSettingContainer'>
                    <Typography variant='h7' gutterBottom component='div'>
                        Modifier avatar
                    </Typography>
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
}
