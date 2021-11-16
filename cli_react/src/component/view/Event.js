import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { isLogged } from '../../services/Toolbox';
import { getEvent } from '../../services/api/Event';
import {
    getRegisterByEventId,
    addRegister,
    delRegister,
} from '../../services/api/Participation';

import '../../App.css';
import Header from '../Header';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ChildFriendly, Masks, ConfirmationNumber } from '@mui/icons-material';

export default function Event() {
    const eventId = useParams().id;
    const [event, setEvent] = useState();
    const [isRegistered, setIsRegistered] = useState();

    useEffect(() => {
        fetchEvent();
        checkRegistration();
    }, []);

    const fetchEvent = async () => {
        await getEvent(eventId)
            .then((res) => {
                setEvent(res);
            })
            .catch(() => {
                alert('Evenement Introuvable, veuillez réessayer');
            });
    };

    const checkRegistration = async () => {
        await getRegisterByEventId(eventId)
            .then(() => {
                setIsRegistered(true);
            })
            .catch(() => {
                setIsRegistered(false);
            });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const id = parseInt(eventId);
        if (isRegistered) {
            await delRegister(id).then(() => {
                setIsRegistered(false);
            });
        } else {
            await addRegister(id).then(() => {
                setIsRegistered(true);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='eventImg'></div>
            <div className='eventContainer'>
                <div className='eventDescription'>
                    <Typography variant='h3' gutterBottom component='div'>
                        {event ? event.name : ' '}
                    </Typography>

                    <Typography variant='h6' gutterBottom component='div'>
                        {event
                            ? `du, ${event.starting_date.substring(0, 10)} 
                            au, ${event.ending_date.substring(0, 10)}`
                            : ' '}
                    </Typography>

                    <Typography variant='body1' gutterBottom component='div'>
                        {event ? event.description : ' '}
                    </Typography>

                    <div className='eventDescriptionSub'>
                        <div className='eventDescItem'>
                            <ChildFriendly />
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                Enfants acceptés :
                                {event
                                    ? event.children_accepted
                                        ? ' oui'
                                        : ' non'
                                    : ' '}
                            </Typography>
                        </div>
                        <div className='eventDescItem'>
                            <Masks />
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                CST obligatoire :
                                {event
                                    ? event.require_covid_safe_ticket
                                        ? ' oui'
                                        : ' non'
                                    : ' '}
                            </Typography>
                        </div>
                        <div className='eventDescItem'>
                            <ConfirmationNumber />
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                Masque obligatoire :
                                {event
                                    ? event.require_mask
                                        ? ' oui'
                                        : ' non'
                                    : ' '}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='eventInformation'>
                    <Button variant='outlined' onClick={handleClick}>
                        {isRegistered ? 'Se désinscrire' : 'Inscription'}
                    </Button>
                    <Typography variant='h6' gutterBottom component='div'>
                        {event
                            ? `${
                                  event.house_number ? event.house_number : ''
                              } ${event.street_name} ,${event.postal_code} ${
                                  event.city
                              }`
                            : ' '}
                    </Typography>
                    <Typography variant='h5' gutterBottom component='div'>
                        {event ? event.max_place_count : ' '} places
                    </Typography>
                    <Typography variant='h5' gutterBottom component='div'>
                        {event ? event.stand_count : ' '} exposants
                    </Typography>
                    <Typography variant='h5' gutterBottom component='div'>
                        type : {event ? event.type : ' '}
                    </Typography>
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
}
