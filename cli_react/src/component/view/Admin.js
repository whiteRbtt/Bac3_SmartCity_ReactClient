import React from 'react';
import {Redirect } from 'react-router-dom';

import { isLogged, getToken } from '../../services/Toolbox';


import '../../App.css';
import Header from '../Header'

export default function Admin(props) {
    return (
        <div>
            <Header/>
            <p>admin panel</p>
            {isLogged() ?null:<Redirect to='/connexion' />}
        </div>
    );
}
