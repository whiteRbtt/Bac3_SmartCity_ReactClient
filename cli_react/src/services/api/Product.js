import axios from 'axios';

import { getToken } from '../Toolbox';

const url = 'http://localhost:3001';

const getProduct = async (idProduct) => {
    return await axios
        .get(`${url}/product/get?idProduct=${idProduct}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
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
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
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
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
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
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

export { getProduct, addProduct, updateProduct, delProduct };
