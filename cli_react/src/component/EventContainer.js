import React, { useState, useEffect } from 'react';

import '../App.css';
import EventTile from './EventTile';
import Pagination from '@mui/material/Pagination';
import { isLogged } from '../services/Toolbox';

const EventContainer = (props) => {
    const nbItemsPerPage = 3;
    const [page, setPage] = useState(1);
    const [nbPages, setNbPages] = useState(1);
    const [toDisplay, setToDisplay] = useState([]);

    useEffect(() => {
        if (isLogged() & props.events.length > 0) {
            setNbPages(Math.ceil(props.events.length / nbItemsPerPage));
            prepareDisplay();
        }
    }, [props.events, page]);

    const prepareDisplay = () => {
        const firstEv = page * nbItemsPerPage - nbItemsPerPage;
        const lastEv = page * nbItemsPerPage;

        setToDisplay(props.events.slice(firstEv, lastEv));
    };

    return (
        <div className='eventTilesContainer'>
            {toDisplay
                ? toDisplay.map((event) => {
                      return <EventTile key={event.name + event.id} name={event.name} city={event.city} type={event.type} id={event.id} />;
                  })
                : null}

            <Pagination
                count={nbPages}
                page={page}
                onChange={(event, val) => {
                    setPage(val);
                }}
            />
        </div>
    );
};

export default EventContainer;
