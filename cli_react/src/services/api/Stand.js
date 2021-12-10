import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getStand = async (idStand) => {
    const res = await axios.get(`${url}/event/stand/get?idStand=${idStand}`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

const getAllStandsByEventId = async (idEvent) => {
    const res = await axios.get(
        `${url}/event/stand/get/all?idEvent=${idEvent}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data;
};

const getAllStands = async () => {
    const res = await axios.get(`${url}/event/stand/all`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.stands;
};

const addStand = async (type, manager, size, idEvent) => {
    const res = await axios.post(
        `${url}/event/stand/add`,
        {
            type: type,
            managerName: manager,
            areaSize: size,
            idEvent: idEvent,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const updateStand = async (idStand, type, manager, size, idEvent) => {
    const res = await axios.patch(
        `${url}/event/stand/update`,
        {
            idStand: idStand,
            type: type,
            managerName: manager,
            areaSize: size,
            idEvent: idEvent,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const delStand = async (idStand) => {
    const res = await axios.delete(`${url}/event/stand/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idStand: idStand,
        },
    });
    return res;
};

export {
    getStand,
    getAllStandsByEventId,
    addStand,
    updateStand,
    delStand,
    getAllStands,
};
