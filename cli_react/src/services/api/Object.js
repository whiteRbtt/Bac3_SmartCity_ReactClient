import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getObjectsRelFromStandId = async (idStand) => {
    return await axios
        .get(`${url}/event/stand/product?idStand=${idStand}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addObjectRel = async (idStand, idProduct) => {
    return await axios
        .post(
            `${url}/event/stand/product/add`,
            {
                idStand: idStand,
                idProduct: idProduct,
            },
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

const updateObjectRel = async (idStand, idProduct, newIdStand, newIdProduct) => {
    return await axios
        .patch(
            `${url}/event/stand/product/update`,
            {
                idStand:idStand, 
                idProduct:idProduct, 
                newIdStand:newIdStand, 
                newIdProduct:newIdProduct
            },
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

const delRelObject = async (idStand, idProduct) => {
    return await axios
        .delete(`${url}/event/stand/product/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                idStand: idStand,
                idProduct: idProduct,
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

export { getObjectsRelFromStandId, addObjectRel, updateObjectRel, delRelObject };
