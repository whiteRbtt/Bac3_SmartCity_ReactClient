import React from 'react';
import '../App.css';
import Header from './Header'
import Button from '@mui/material/Button';

const Profile = (props) => {
    const handleClick = () => {
        if (sessionStorage.getItem('token'))
            alert(sessionStorage.getItem('token'));
        else
            alert("session vide");
    };

    return (
        <div>
            <Header />
            <p>profil</p>
            <p></p>
            <div>
                <Button variant='outlined' onClick={handleClick}>
                    lire session
                </Button>
            </div>
        </div>
    );
};

export default Profile;
