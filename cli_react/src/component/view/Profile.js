import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import geralt from '../../services/img/geralt.png';
import '../../App.css';
import Header from '../Header';
import EventContainer from '../EventContainer';
import { isLogged, getSessionUser } from '../../services/Toolbox';
import { getAccountPict } from '../../services/api/User';
import { getAllRegisterCurrentUser } from '../../services/api/Participation';
import { errorFetching } from '../../services/string';

import Typography from '@mui/material/Typography';

const Profile = () => {
    const [user] = useState(getSessionUser());
    const [avatar, setAvatar] = useState();
    const [pastRegister, setPastRegister] = useState();
    const [futureRegister, setFutureRegister] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            fetchRegister();
            fetchPic();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const fetchRegister = async () => {
        try {
            const res = await getAllRegisterCurrentUser();
            setPastRegister(res.oldEvents);
            setFutureRegister(res.upcomingEvents);
        } catch (err) {
            setMessage(errorFetching);
        }
    };

    const fetchPic = async () => {
        try {
            const res = await getAccountPict();
            setAvatar(res);
        } catch (err) {
            setMessage(errorFetching);
        }
    };

    return (
        <div>
            <Header />

            <div className='profileContainerTop'>
                {<img src={avatar ? avatar : geralt} alt='avatar' className='avatar' />}

                <Typography variant='h2'>{user ? user.name : 'John Doe'}</Typography>
                <Typography variant='h5' className='errorMessage'>
                    {message}
                </Typography>
                <Link to={{ pathname: `/param`, avatar: avatar }} className='settingsLink'>
                    Paramètres
                </Link>
            </div>

            <div className='profileContainerBottom'>
                <div className='futurePastEventsContainer'>
                    <Typography variant='h3' className='whiteNeon'>
                        Mes évenements passés
                    </Typography>
                    {pastRegister ? <EventContainer events={pastRegister} /> : ''}
                </div>

                <div className='futurePastEventsContainer'>
                    <Typography variant='h3' className='whiteNeon'>
                        Mes évenements futurs
                    </Typography>
                    {futureRegister ? <EventContainer events={futureRegister} /> : ''}
                </div>
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Profile;
