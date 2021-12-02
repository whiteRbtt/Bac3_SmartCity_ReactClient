import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import imgActivity from '../../services/img/activity.jpg';
import Header from '../Header';
import EventContainer from '../EventContainer';
import { isLogged, getSessionUser } from '../../services/Toolbox';
import { getPopularEvents } from '../../services/api/Event';
import { errorFetching } from '../../services/string';

import Typography from '@mui/material/Typography';

const Home = () => {
    const [popEvents, setPopEvents] = useState([]);
    const [user] = useState(getSessionUser());
    const [message, setMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            fetchTrendings();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const fetchTrendings = async () => {
        try {
            setPopEvents(await getPopularEvents());
        } catch (err) {
            setMessage(errorFetching);
        }
    };

    return (
        <div>
            <Header />

            <div className='homeContainerTop'>
                <div className='welcomeContainer'>
                    <Typography variant='h2' id='welcome'>
                        Bienvenue, {user ? user.name : ' '}
                    </Typography>

                    <Typography variant='h3'>Qu'allez vous faire aujourd'hui ?</Typography>
                </div>

                <img src={imgActivity} alt='lekayakcbien' id='homeImg' />
            </div>

            <div className='homeContainerBottom'>
                <Typography variant='h4' className='whiteNeon'>
                    Les évenements les plus appréciés
                </Typography>

                {popEvents ? <EventContainer events={popEvents} /> : message}
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
