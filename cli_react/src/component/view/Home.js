import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import EventTile from '../EventTile';
import { isLogged } from '../../services/Toolbox';
import { getOwnUser } from '../../services/api/User';
import { getPopularEvents } from '../../services/api/Event';

import Typography from '@mui/material/Typography';


const Home = (props) => {
    const [popEvents, setPopEvents] = useState([]);
    const [userName, setuserName] = useState();

    useEffect(() => {
        if(isLogged()){
            fetchTrendings();
            fetchUsername();
        }
    }, []);

    const fetchUsername = async () => {
        await getOwnUser()
            .then((res) => {
                setuserName(res.name);
            })
            .catch(() => {
                alert('Une erreur est survenue, merci de réessayer plus tard');
            });
    };

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
            <Header />
            <div className='homeContainer1' >
                <div className='welcomeContainer'>
                    <Typography variant='h3' gutterBottom component='div'>
                        Bienvenue, {userName}
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
                {
                    popEvents.map((event) => {
                        return <EventTile
                                    key={event.name + event.id}
                                    name={event.name}
                                    city={event.city}
                                    type={event.type}
                                    id={event.id}
                                />
                    })
                }
                </div>
            </div>
            
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Home;
