import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';

import Button from '@mui/material/Button';

import { isLogged, getToken } from '../../services/Toolbox';

import { getOwnUser } from '../../services/api/User';

const Home = (props) => {
    const handleClick = async () => {
        //alert(sessionStorage.getItem('jwtToken'));
        try {
            const a = await getOwnUser();
            console.log(`res = `, a);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <Header />
            <Button
                variant='contained'
                onClick={handleClick}
                style={{ margin: '100px 0px 0px 0px' }}
            >
                token
            </Button>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
