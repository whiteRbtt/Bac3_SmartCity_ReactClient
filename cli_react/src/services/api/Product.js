import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getProduct = async (idProduct) => {
    return await axios
        .get(`${url}/product/get?idProduct=${idProduct}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

const addProduct = async (name, desc, price) => {
    return await axios
        .post(
            `${url}/product/add`,
            {
                name: name,
                description: desc,
                price: price,
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

const updateProduct = async (idProduct, name, desc, price) => {
    return await axios
        .patch(
            `${url}/product/update`,
            {
                idProduct: idProduct,
                name: name,
                description: desc,
                price: price,
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

const delProduct = async (idProduct) => {
    return await axios
        .delete(`${url}/product/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                idProduct: idProduct,
            },
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        });
};

export { getProduct, addProduct, updateProduct, delProduct };
