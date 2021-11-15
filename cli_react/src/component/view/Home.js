import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';

import Button from '@mui/material/Button';

import { isLogged } from '../../services/Toolbox';

import { getOwnUser } from '../../services/api/User';

const Home = (props) => {
    const handleClick = async () => {
        console.log("bouh")
    };

    return (
        <div>
            <Header />
            <Button
                variant='contained'
                onClick={handleClick}
                style={{ margin: '100px 0px 0px 0px' }}
            >
                click
            </Button>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
