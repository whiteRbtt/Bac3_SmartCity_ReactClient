import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getAllEvents = async () => {
    const res = await axios.get(`${url}/event/all`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.events;
};

const getEvent = async (idEvent) => {
    const res = await axios.get(`${url}/event?idEvent=${idEvent}`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.event;
};

const getPopularEvents = async () => {
    const res = await axios.get(`${url}/event/popular`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.events;
};

const searchEvent = async (date, city) => {
    let request = '';
    if (!date) request = `${url}/event/search?city=${city}`;
    else if (!city) request = `${url}/event/search?date=${date}`;
    else request = `${url}/event/search?date=${date}&city=${city}`;

    const res = await axios.get(request, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.events;
};

const addEvent = async (
    name,
    startDate,
    endDate,
    street,
    number,
    postCode,
    city,
    isChildFriendly,
    description,
    type,
    securityLv,
    isMaskNeeded,
    isCstNeeded,
    maxPlace
) => {
    const res = await axios.post(
        `${url}/event/add`,
        {
            name: name,
            startingDate: startDate,
            endingDate: endDate,
            streetName: street,
            houseNumber: number,
            postalCode: postCode,
            city: city,
            childrenAccepted: isChildFriendly,
            description: description,
            type: type,
            securityLevel: securityLv,
            requireMask: isMaskNeeded,
            requireCovidSafeTicket: isCstNeeded,
            maxPlaceCount: maxPlace,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const updateEvent = async (
    id,
    name,
    startDate,
    endDate,
    street,
    number,
    postCode,
    city,
    isChildFriendly,
    description,
    type,
    securityLv,
    isMaskNeeded,
    isCstNeeded,
    maxPlace,
    mailCreator
) => {
    const res = await axios.patch(
        `${url}/event/update`,
        {
            idEvent: id,
            name: name,
            startingDate: startDate,
            endingDate: endDate,
            streetName: street,
            houseNumber: number,
            postalCode: postCode,
            city: city,
            childrenAccepted: isChildFriendly,
            description: description,
            type: type,
            securityLevel: securityLv,
            requireMask: isMaskNeeded,
            requireCovidSafeTicket: isCstNeeded,
            maxPlaceCount: maxPlace,
            mailAddressCreator: mailCreator,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );

    return res;
};

const delEvent = async (idEvent) => {
    const res = await axios.delete(`${url}/event/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idEvent: idEvent,
        },
    });
    return res;
};

export {
    getAllEvents,
    getEvent,
    getPopularEvents,
    searchEvent,
    addEvent,
    updateEvent,
    delEvent,
};
