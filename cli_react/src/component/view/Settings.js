import React from 'react';
import {Redirect } from 'react-router-dom';

import { isLogged } from '../../services/Toolbox';
import '../../App.css';
import Header from '../Header'


export default function Settings() {
    return (
        <div>
            <Header/>
            <p>settings</p>
            {isLogged() ?null:<Redirect to='/connexion' />}
        </div>
    );
}
