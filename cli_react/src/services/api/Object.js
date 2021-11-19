import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getObjectsRelFromStandId = async (idStand) => {
    const res = await axios.get(
        `${url}/event/stand/product?idStand=${idStand}`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data;
};

const getAllObject = async () => {
    const res = await axios.get(
        `${url}/event/stand/product/all`,
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res.data.objects;
};

const addObjectRel = async (idStand, idProduct) => {
    const res = await axios.post(
        `${url}/event/stand/product/add`,
        {
            idStand: idStand,
            idProduct: idProduct,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const updateObjectRel = async (
    idStand,
    idProduct,
    newIdStand,
    newIdProduct
) => {
    const res = await axios.patch(
        `${url}/event/stand/product/update`,
        {
            idStand: idStand,
            idProduct: idProduct,
            newIdStand: newIdStand,
            newIdProduct: newIdProduct,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const delRelObject = async (idStand, idProduct) => {
    const res = await axios.delete(`${url}/event/stand/product/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idStand: idStand,
            idProduct: idProduct,
        },
    });
    return res;
};

export {
    getObjectsRelFromStandId,
    addObjectRel,
    updateObjectRel,
    delRelObject,
    getAllObject
};
