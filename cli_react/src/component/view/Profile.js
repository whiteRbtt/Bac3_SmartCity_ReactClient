import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import geralt from '../../geralt.png';
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
            setAvatar(await getAccountPict());
        } catch (err) {
            setMessage(errorFetching);
        }
    };

    return (
        <div>
            <Header />

            <div className='ProfileContainer'>
                {avatar ? (
                    <img
                        src={avatar}
                        alt='avatar'
                        className='tilesImg'
                    />
                ) : (
                    <img src={geralt} alt='avatar' className='tilesImg' />
                )}

                <Typography variant='h3' gutterBottom component='div'>
                    {user ? user.name : ''}
                </Typography>
                {message}
                <Link
                    to={{ pathname: `/param`, state:{avat: avatar} }}
                    className='settingsLink'
                >
                    Paramètres
                </Link>
            </div>

            <div className='profileEventsContainer'>
                <div className='pastEventsContainer'>
                    <Typography variant='h5' gutterBottom component='div'>
                        évenements passés
                    </Typography>
                    {pastRegister
                        ? <EventContainer events={pastRegister} />
                        : ''}
                </div>

                <div className='futureEventsContainer'>
                    <Typography variant='h5' gutterBottom component='div'>
                        évenements futurs
                    </Typography>
                    {futureRegister
                        ? <EventContainer events={futureRegister} />: ''}
                </div>
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Profile;
