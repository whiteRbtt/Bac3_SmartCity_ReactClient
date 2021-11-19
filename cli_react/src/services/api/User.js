import axios from 'axios';

import { getToken } from '../Toolbox';
import { url } from '../string';

const login = async (mail, password) => {
    const basicAuth = Buffer.from(`${mail}:${password}`, 'utf8').toString(
        'base64'
    );

    const res = await axios.post(
        `${url}/user/login`,
        {},
        {
            headers: { authorization: `Basic ${basicAuth}` },
        }
    );
    sessionStorage.setItem('jwtToken', res.data.token);
    return res;
};

const register = async (mail, password, name, birthDate) => {
    const res = await axios.post(
        `${url}/user/register`,
        {
            mailAddress: mail,
            password: password,
            name: name,
            birthdate: birthDate,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    sessionStorage.setItem('jwtToken', res.data.token);
    return res;
};

const registerAdmin = async (mail, password, name, birthDate) => {
    const res = await axios.post(
        `${url}/user/register`,
        {
            mailAddress: mail,
            password: password,
            name: name,
            birthDate: birthDate,
            role: 'admin',
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const getUser = async (mail) => {
    const res = await axios.get(`${url}/user?mailAddressUser=${mail}`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data;
};

const getOwnUser = async () => {
    const res = await axios.get(`${url}/user/account`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.user;
};

const getAllUsers = async () => {
    const res = await axios.get(`${url}/user/all`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.users;
};

const getAccountPict = async () => {
    const res = await axios.get(`${url}/user/account/picture`, {
        headers: { authorization: `Bearer ${getToken()}` },
    });
    return res.data.profilePicture;
};

const updateOwnPwd = async (oldPwd, newPwd) => {
    const res = await axios.patch(
        `${url}/user/account/update`,
        {
            currentPassword: oldPwd,
            newPassword: newPwd,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const updateUserProfile = async (mail, newMail, pwd, birthdate, role) => {
    const res = await axios.patch(
        `${url}/user/account/admin/update`,
        {
            userMailAddress: mail,
            newUserMailAddress: newMail,
            password: pwd,
            birthdate: birthdate,
            role: role,
        },
        {
            headers: { authorization: `Bearer ${getToken()}` },
        }
    );
    return res;
};

const delUser = async (mail) => {
    const res = await axios.delete(`${url}/user/delete`, {
        headers: { authorization: `Bearer ${getToken()}` },
        data: {
            mailAddress: mail,
        },
    });
    return res;
};

const uploadAvatar = async (formData) => {
    const res = await axios.patch(
        `${url}/user/account/profilePicture`,
        formData,
        {
            headers: {
                authorization: `Bearer ${getToken()}`,
                'Content-Type': `multipart/form-data`,
            },
        }
    );
    return res;
};

export {
    login,
    register,
    registerAdmin,
    getUser,
    getOwnUser,
    getAccountPict,
    updateOwnPwd,
    updateUserProfile,
    delUser,
    getAllUsers,
    uploadAvatar,
};
