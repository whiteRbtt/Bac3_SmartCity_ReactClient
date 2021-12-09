import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { transformDate, isLogged, isNotBlank } from '../../services/Toolbox';
import { searchEvent } from '../../services/api/Event';
import { blankFieldError, missingFields, noResults} from '../../services/string';
import '../../App.css';
import Header from '../Header';
import EventContainer from '../EventContainer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const Research = () => {
    const [date, setDate] = useState(null);
    const [city, setCity] = useState('');

    const [results, setResults] = useState();
    const [message, setMessage] = useState('');


    const handleClick = async (e) => {
        e.preventDefault();

        let targetDate;
        date ? (targetDate = transformDate(date)) : (targetDate = undefined);

        if (date | isNotBlank(city)) {
            try {
                const res = await searchEvent(targetDate, city);
                if (res.length > 0) {
                    setResults(res);
                    setMessage();
                } else {
                    setResults();
                    setMessage(noResults);
                }
            } catch (err) {
                console.error(err);
            }
        } else setMessage(missingFields)

    };

    return (
        <div>
            <Header />
            <div className='searchContainer'>
                <Typography variant='h3' className='whiteNeon'>
                    Rechercher un évenement
                </Typography>
                <div className='searchFormContainer'>
                    <TextField
                        label='Ville'
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        error={city === '' ? null : !isNotBlank(city)}
                        helperText={city === '' ? null : !isNotBlank(city) ? blankFieldError : null}
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
                    <Typography variant='h5' className='errorMessage'>
                        {message}
                    </Typography>
                    {results ? <EventContainer events={results} /> : null}
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Research;
