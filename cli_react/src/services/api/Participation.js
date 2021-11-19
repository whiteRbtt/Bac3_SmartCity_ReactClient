import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getNbRegisterEvent = async (idEvent) => {
    const res = await axios.get(
        `${url}/event/reservation/count?idEvent=${idEvent}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data.participationInfos.participation_count;
};

const getAllRegisterEvent = async (idEvent) => {
    const res = await axios.get(
        `${url}/event/reservation/consult/all?idEvent=${idEvent}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );

    return res.data.participations;
};

const getAllRegister = async () => {
    const res = await axios.get(
        `${url}/user/reservation/all`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data.participations;
};

const getDateRegisterEvent = async (idEvent, mail) => {
    const res = await axios.get(
        `${url}/event/reservation?mailAddress=${mail}&idEvent=${idEvent}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data.registerDate;
};

const getRegisterByEventId = async (idEvent) => {
    const res = await axios.get(
        `${url}/user/reservation/consult?idEvent=${idEvent}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data;
};

const getAllRegisterCurrentUser = async () => {
    const res = await axios.get(`${url}/user/reservation/consult/all`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

const getRegisterBtwnTimespan = async (startDate, endDate) => {
    const res = await axios.get(
        `${url}/user/reservation/consult/between?startingDate=${startDate}&endingDate=${endDate}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data;
};

const addRegister = async (idEvent) => {
    const res = await axios.post(
        `${url}/user/reservation/add`,
        {
            idEvent: idEvent,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const addRegisterAdmin = async (idEvent, mailUser) => {
    const res = await axios.post(
        `${url}/user/reservation/admin/add`,
        {
            idEvent: idEvent,
            mailAddress: mailUser,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const delRegister = async (idEvent) => {
    await axios.delete(`${url}/user/reservation/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idEvent: idEvent,
        },
    });
};

const delRegisterAdmin = async (idEvent, mailUser) => {
    await axios.delete(`${url}/user/reservation/admin/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idEvent: idEvent,
            mailAddress: mailUser,
        },
    });
};

export {
    getNbRegisterEvent,
    getAllRegisterEvent,
    getDateRegisterEvent,
    getRegisterByEventId,
    getAllRegisterCurrentUser,
    getRegisterBtwnTimespan,
    addRegister,
    addRegisterAdmin,
    delRegister,
    delRegisterAdmin,
    getAllRegister
};
