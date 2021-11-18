import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { transformDate, isLogged, strNotBlank } from '../../services/Toolbox';
import { searchEvent } from '../../services/api/Event';
import { noResults, strBlankError, errorFetching } from '../../services/string';
import '../../App.css';
import Header from '../Header';
import EventTile from '../EventTile';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const Research = () => {
    const [date, setDate] = React.useState(new Date());
    const [city, setCity] = React.useState('');
    const [events, setEvents] = React.useState();
    const [message, setMessage] = React.useState(noResults);

    const handleClick = async (e) => {
        e.preventDefault();

        const targetDate = transformDate(date);

        if (targetDate || strNotBlank(city)) {
            try {
                const res = await searchEvent(date, city)
                setEvents(res);
            } catch (err) {
                setMessage(errorFetching);
                console.log(err)
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
                    error={city === '' ? null : !strNotBlank(city)}
                    helperText={
                        city === ''
                            ? null
                            : !strNotBlank(city)
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
                    ? events.map((event) => {
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
                    : message}
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Research;
