import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { transformDate, isLogged, isNotBlank } from '../../services/Toolbox';
import { searchEvent } from '../../services/api/Event';
import { strBlankError } from '../../services/string';
import '../../App.css';
import Header from '../Header';
import EventContainer from '../EventContainer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const Research = () => {
    const [date, setDate] = useState();
    const [city, setCity] = useState('');
    const [results, setResults] = useState();

    const handleClick = async (e) => {
        e.preventDefault();

        let targetDate = null;
        if (date) targetDate = transformDate(date);

        if (date | isNotBlank(city)) {
            try {
                setResults(await searchEvent(targetDate, city));
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className='searchTitle'>
                <Typography variant='h3' gutterBottom component='div'>
                    Rechercher un évenement
                </Typography>
            </div>

            <div className='searchContainer'>
                <div className='searchFormContainer'>
                    <TextField
                        label='Ville'
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        error={city === '' ? null : !isNotBlank(city)}
                        helperText={city === '' ? null : !isNotBlank(city) ? strBlankError : null}
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
                    {results ? <EventContainer events={results} /> : null}
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Research;
