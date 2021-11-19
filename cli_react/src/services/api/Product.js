import axios from 'axios';

import { getToken } from '../Toolbox';

import { url } from '../string';

const getProduct = async (idProduct) => {
    const res = await axios.get(`${url}/product/get?idProduct=${idProduct}`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

const getAllProducts = async () => {
    const res = await axios.get(`${url}/product/all`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.products;
};

const addProduct = async (name, desc, price) => {
    const res = await axios.post(
        `${url}/product/add`,
        {
            name: name,
            description: desc,
            price: price,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const updateProduct = async (idProduct, name, desc, price) => {
    const res = await axios.patch(
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
    );
    return res;
};

const delProduct = async (idProduct) => {
    const res = await axios.delete(`${url}/product/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            idProduct: idProduct,
        },
    });
    return res;
};

export { getProduct, addProduct, updateProduct, delProduct, getAllProducts };
