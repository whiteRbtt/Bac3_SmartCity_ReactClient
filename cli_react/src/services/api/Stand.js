import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getStand = async (idStand) => {
    return await axios
        .get(`${url}/event/stand/get?idStand=${idStand}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

const getAllStandsByEventId = async (idEvent) => {
    return await axios
        .get(`${url}/event/stand/get/all?idEvent=${idEvent}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

const addStand = async (type, manager, size, idEvent) => {
    return await axios
        .post(
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
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        });
};

const updateStand = async (idStand, type, manager, size, idEvent) => {
    return await axios
        .patch(
            `${url}/product/update`,
            {
                idStand: idStand,
                type: type,
                manager_name: manager,
                area_size: size,
                id_event: idEvent,
            },
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        });
};

const delStand = async (idStand) => {
    return await axios
        .delete(`${url}/event/stand/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                idStand: idStand,
            },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        });
};

export { getStand, getAllStandsByEventId, addStand, updateStand, delStand };
