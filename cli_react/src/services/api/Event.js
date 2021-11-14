import axios from 'axios';

import { getToken } from '../Toolbox';

const url = 'http://localhost:3001';

const getAllEvents = async () => {
    return await axios
        .get(`${url}/event/all`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            const events = res.data.events;
            return events;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getEvent = async (idEvent) => {
    return await axios
        .get(`${url}/event?idEvent=${idEvent}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            const event = res.data.event;
            return event;
        })
        .catch((err) => {
            console.log(err);
        });
};

const popularEvents = async () => {
    return await axios
        .get(`${url}/event/popular`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            const events = res.data.events;
            return events;
        })
        .catch((err) => {
            console.log(err);
        });
};

export { getAllEvents, getEvent, popularEvents };
