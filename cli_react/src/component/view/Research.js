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

export default function Research() {
    const [date, setDate] = React.useState(null);
    const [city, setCity] = React.useState('');
    const [events, setEvents] = React.useState();
    const [message, setMessage] = React.useState(noResults);

    const handleClick = async (e) => {
        e.preventDefault();

        // if (date) {
        //     const strDate = transformDate(date);
        //     setDate(strDate); 
        // }

        // if (date || strNotBlank(city)) {

        //     await searchEvent(date, city).then((res) => {
        //         setEvents(res);
        //     }).catch(()=>{
        //         setMessage(errorFetching)
        //     });
        // }
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
                    onChange={(event) => setDate(event)}
                    renderInput={(params) => <TextField {...params} />}
                    error={false}
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
}
