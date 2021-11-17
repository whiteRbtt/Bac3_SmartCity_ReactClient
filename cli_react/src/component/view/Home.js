import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import EventTile from '../EventTile';
import { isLogged, getSessionUser } from '../../services/Toolbox';
import { getPopularEvents } from '../../services/api/Event';

import Typography from '@mui/material/Typography';

const Home = (props) => {
    const [popEvents, setPopEvents] = useState([]);
    const [user] = useState(getSessionUser());

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
        await getPopularEvents()
            .then((res) => {
                setPopEvents(res);
            })
            .catch(() => {
                alert('Une erreur est survenue, merci de réessayer plus tard');
            });
    };

    return (
        <div>
            <Header/>
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
                <div className='trendingTilesContainer'>
                    {popEvents
                        ? popEvents.map((event) => {
                              return (
                                  <EventTile
                                      key={event.name + event.id}
                                      name={event.name}
                                      city={event.city}
                                      type={event.type}
                                      id={event.id}
                                  />
                              );
                          })
                        : ' '}
                </div>
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
