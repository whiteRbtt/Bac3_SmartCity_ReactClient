import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { transformDate, isLogged } from '../../services/Toolbox';
import { searchEvent } from '../../services/api/Event';
import '../../App.css';
import Header from '../Header';
import EventTile from '../EventTile';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function Research() {
    const [date, setDate] = React.useState();
    const [events, setEvents] = React.useState();

    const handleClick = async (e) => {
        e.preventDefault();

        let city = document.getElementById('cityField').value;
        const reg = new RegExp(/[a-zA-Z]/g); // check si c'est pas juste des whitespae
        if (!reg.test(city)) {
            city = null;
        }

        let searchDate;
        date ? (searchDate = transformDate(date)) : (searchDate = null);

        if (searchDate || city) {
            await searchEvent(searchDate, city)
                .then((res) => {
                    setEvents(res);
                })
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
                <TextField id='cityField' label='Ville' variant='outlined' />
                <DesktopDatePicker
                    label='Date'
                    value={date}
                    minDate={new Date('1920-01-01')}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
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
                    : "Aucun évenement ne correspond à la recherche"}
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
}
