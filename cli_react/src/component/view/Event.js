import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { errorFetching } from '../../services/string';
import { isLogged } from '../../services/Toolbox';
import { getEvent } from '../../services/api/Event';
import { getRegisterByEventId, addRegister, delRegister, getNbRegisterEvent } from '../../services/api/Participation';

import '../../App.css';
import Header from '../Header';

import { Typography, Button } from '@mui/material';
import { ChildFriendly, Masks, ConfirmationNumber } from '@mui/icons-material';

export default function Event() {
    const eventId = useParams().id;

    const [event, setEvent] = useState();
    const [nbPlacesLeft, setNbPlacesLeft] = useState();
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState();

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            const fetchEvent = async () => {
                try {
                    setEvent(await getEvent(eventId));
                } catch (err) {
                    setMessage(errorFetching);
                }
            };
            fetchEvent();
        }
        return () => {
            isMounted = false;
        };
    }, [eventId]);

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted && event) {
            const fetchNbRegistration = async () => {
                try {
                    const nbRegister = await getNbRegisterEvent(eventId);
                    setNbPlacesLeft(event.max_place_count - nbRegister);
                } catch (err) {
                    setNbPlacesLeft(event.max_place_count);
                }
            };

            const checkRegistration = async () => {
                try {
                    await getRegisterByEventId(eventId);
                    setIsRegistered(true);
                } catch (err) {
                    setIsRegistered(false);
                }
            };

            checkRegistration();
            fetchNbRegistration();

            const endingDate = new Date(event.ending_date);
            const today = new Date();
            endingDate < today ? setIsButtonDisabled(true) : setIsButtonDisabled(false);
        }
        return () => {
            isMounted = false;
        };
    }, [event, eventId]);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            try {
                if (isRegistered) {
                    await delRegister(parseInt(eventId));
                    setIsRegistered(false);
                    setNbPlacesLeft(nbPlacesLeft + 1);
                } else {
                    await addRegister(parseInt(eventId));
                    setIsRegistered(true);
                    setNbPlacesLeft(nbPlacesLeft - 1);
                }
                setMessage('');
            } catch (err) {
                setMessage(errorFetching);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className='eventContainer'>
                <div className='eventLeftContainer'>
                    <Typography variant='h3'>{event ? event.name : message}</Typography>

                    <Typography variant='h5'>{event ? event.type : ' '}</Typography>

                    <Typography variant='h6' className='whiteNeon'>
                        {event
                            ? `du, ${event.starting_date.substring(0, 10)} 
                            au, ${event.ending_date.substring(0, 10)}`
                            : ' '}
                    </Typography>

                    <Typography variant='body1'>{event ? event.description : ' '}</Typography>

                    <div className='eventDescriptionSub'>
                        <div className='eventDescItem'>
                            <ChildFriendly />
                            <Typography variant='h6'>
                                Enfants acceptés :{event ? (event.children_accepted ? ' oui' : ' non') : ' '}
                            </Typography>
                        </div>
                        <div className='eventDescItem'>
                            <Masks />
                            <Typography variant='h6'>
                                CST obligatoire :{event ? (event.require_covid_safe_ticket ? ' oui' : ' non') : ' '}
                            </Typography>
                        </div>
                        <div className='eventDescItem'>
                            <ConfirmationNumber />
                            <Typography variant='h6'>
                                Masque obligatoire :{event ? (event.require_mask ? ' oui' : ' non') : ' '}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='eventRightContainer'>
                    <Button variant='outlined' onClick={handleClick}>
                        {isButtonDisabled ? 'Inscriptions cloturées' : isRegistered ? 'Se désinscrire' : 'Inscription'}
                    </Button>
                    {message}
                    <Typography variant='h6' className='whiteNeon'>
                        {event
                            ? `${event.house_number ? event.house_number : ''} ${event.street_name} , ${
                                  event.postal_code
                              } ${event.city}`
                            : ' '}
                    </Typography>
                    <Typography variant='h5'>
                        {nbPlacesLeft
                            ? nbPlacesLeft > 1
                                ? nbPlacesLeft + ' places restantes'
                                : nbPlacesLeft + ' place restante'
                            : ' '}
                    </Typography>
                    <Typography variant='h5'>
                        {event
                            ? event.stand_count > 1
                                ? event.stand_count + ' exposants'
                                : event.stand_count + ' exposant'
                            : ' '}{' '}
                    </Typography>
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
}
