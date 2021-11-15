import axios from 'axios';

import { getToken } from '../Toolbox';

const url = 'http://localhost:3001';

const login = async (mail, password) => {
    const basicAuth = Buffer.from(`${mail}:${password}`, 'utf8').toString(
        'base64'
    );
    await axios
        .post(
            `${url}/user/login`,
            {},
            {
                headers: { authorization: `Basic ${basicAuth}` },
            }
        )
        .then((res) => {
            sessionStorage.setItem('jwtToken', res.data.token);
            console.log(
                'login succesfull - token stored in browser session'
            );
        })
        .catch((err) => {
            throw err;
        });
};

const register = async (mail, password, name, birthDate) => {
    await axios
        .post(
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
        )
        .then((res) => {
            sessionStorage.setItem('jwtToken', res.data.token);
            console.log(
                'register succesfull - token stored in browser session'
            );
        })
        .catch((err) => {
            throw err;
        });
};

const registerAdmin = async (mail, password, name, birthDate) => {
    await axios
        .post(
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
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err;
        });
};

const getUser = async (mail) => {
    return await axios
        .get(`${url}/user?mailAddressUser=${mail}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getOwnUser = async () => {
    return await axios
        .get(`${url}/user/account`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data.user;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getAccountPict = async () => {
    return await axios
        .get(`${url}/user/account/picture`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const updateOwnPwd = async (oldPwd, newPwd) => {
    return await axios
        .patch(
            `${url}/user/account/update`,
            {
                currentPassword: oldPwd,
                newPassword: newPwd,
            },
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
};

const updateUserProfile = async (mail, newMail, pwd, birthdate, role) => {
    return await axios
        .patch(
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
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
};

const delUser = async (mail) => {
    return await axios
        .delete(`${url}/user/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                mailAddress: mail,
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
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
};
