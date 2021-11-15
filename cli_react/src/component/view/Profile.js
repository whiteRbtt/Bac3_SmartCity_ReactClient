import React from 'react';
import { Link, Redirect } from 'react-router-dom';


import '../../App.css';
import Header from '../Header'
import { isLogged, getToken } from '../../services/Toolbox';

const Profile = (props) => {

    return (
        <div>
            <Header />
            <p>profil</p>
            {isLogged() ?null:<Redirect to='/connexion' />}
        </div>
    );
};

export default Profile;
