import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { transformDate, isLogged, isNotBlank } from '../../services/Toolbox';
import { searchEvent } from '../../services/api/Event';
import { noResults, strBlankError, errorFetching } from '../../services/string';
import '../../App.css';
import Header from '../Header';
import EventContainer from '../EventContainer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const Research = () => {
    const [date, setDate] = useState(new Date());
    const [targetDate, setTargetDate] = useState();
    const [city, setCity] = useState('');
    const [events, setEvents] = useState();
    const [message, setMessage] = useState(noResults);

    const handleClick = async (e) => {
        e.preventDefault();

        date ? setTargetDate(transformDate(date)) : setTargetDate(null);

        if (targetDate || isNotBlank(city)) {
            try {
                const res = await searchEvent(targetDate, city);
                setEvents(res);
            } catch (err) {
                setMessage(errorFetching);
                console.errror(err);
            }
        }
    };

    return (
        <div>
            <Header />

            <div className='searchTitle'>
                <Typography variant='h4' gutterBottom component='div'>
                    Rechercher un évenement,
                </Typography>
            </div>

            <div className='searchFormContainer'>
                <TextField
                    label='Ville'
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    error={city === '' ? null : !isNotBlank(city)}
                    helperText={
                        city === ''
                            ? null
                            : !isNotBlank(city)
                            ? strBlankError
                            : null
                    }
                />

                <DesktopDatePicker
                    label='Date'
                    value={date}
                    minDate={new Date('1920-01-01')}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />

                <Button variant='outlined' onClick={handleClick}>
                    Rechercher
                </Button>
            </div>

            <div className='searchResultContainer'>
                {events
                    ? <EventContainer events={events} />
                    : message}
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Research;
