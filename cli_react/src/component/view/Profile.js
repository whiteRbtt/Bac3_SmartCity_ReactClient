import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import geralt from '../../geralt.png';

import '../../App.css';
import Header from '../Header';
import EventTile from '../EventTile';
import { isLogged, getSessionUser } from '../../services/Toolbox';
import { getAccountPict } from '../../services/api/User';
import { getAllRegisterCurrentUser } from '../../services/api/Participation';

import Typography from '@mui/material/Typography';

const Profile = () => {
    const [user] = useState(getSessionUser());
    const [avatar, setAvatar] = useState();
    const [pastRegister, setPastRegister] = useState();
    const [futureRegister, setFutureRegister] = useState();

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
        await getAllRegisterCurrentUser()
            .then((res) => {
                setPastRegister(res.oldEvents);
                setFutureRegister(res.upcomingEvents);
            })
            .catch(() => {
                alert('Une erreur est survenue, merci de réessayer plus tard');
            });
    };

    const fetchPic = async () => {
        await getAccountPict()
            .then((res) => {
                setAvatar(res.profilePicture.split(',')[1]);
            })
            .catch(() => {
                alert('Une erreur est survenue, merci de réessayer plus tard');
            });
    };

    return (
        <div>
            <Header />

            <div className='ProfileContainer'>
                {avatar ? (
                    <img
                        src={`data:image/jpeg;base64,${avatar}`}
                        alt='avatar'
                        className='tilesImg'
                    />
                ) : (
                    <img src={geralt} alt='avatar' className='tilesImg' />
                )}

                <Typography variant='h3' gutterBottom component='div'>
                    {user ? user.name : ' '}
                </Typography>

                <Link
                    to={`/param`}
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
                        ? pastRegister.map((event) => {
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
                        : 'Aucun évenements'}
                </div>

                <div className='futureEventsContainer'>
                    <Typography variant='h5' gutterBottom component='div'>
                        évenements futurs
                    </Typography>
                    {futureRegister
                        ? futureRegister.map((event) => {
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
                        : 'Aucun évenements'}
                </div>
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Profile;
