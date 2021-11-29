import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
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
            const res = await getPopularEvents();
            setPopEvents(res);
        } catch (err) {
            setMessage(errorFetching);
            console.error(err);
        }
    };

    return (
        <div>
            <Header />
            <div className='homeContainer1'>
                <div className='welcomeContainer'>
                    <Typography variant='h3' gutterBottom component='div'>
                        Bienvenue, {user ? user.name : ' '}
                    </Typography>
                    <Typography variant='h6' gutterBottom component='div'>
                        Qu'allez vous faire aujourd'hui ?
                    </Typography>
                </div>
            </div>
            <div className='homeContainer2'>
                <Typography variant='h3' gutterBottom component='div'>
                    Evenements tendance,
                </Typography>

                {popEvents ? <EventContainer events={popEvents} /> : message}
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
