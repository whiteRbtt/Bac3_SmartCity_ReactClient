import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged } from '../../services/Toolbox';
import { getAllEvents } from '../../services/api/Event';

import Button from '@mui/material/Button';

const Home = (props) => {

    const handleClick = () => {
        //alert(sessionStorage.getItem('jwtToken'));
        try {
            getAllEvents().then((res) => {
                console.log(`res`, res);
            });
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
            <Link to={`/connexion`}>login</Link>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
