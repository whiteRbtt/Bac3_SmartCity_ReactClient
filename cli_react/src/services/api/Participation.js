import axios from 'axios';

import { getToken } from '../Toolbox';

const url = 'http://localhost:3001';

const getNbRegisterEvent = async (idEvent) => {
    return await axios
        .get(`${url}/event/reservation/count?idEvent=${idEvent}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data.participationInfos.participation_count;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getAllRegisterEvent = async (idEvent) => {
    return await axios
        .get(`${url}/event/reservation/consult/all?idEvent=${idEvent}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data.participations;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getDateRegisterEvent = async (idEvent, mail) => {
    return await axios
        .get(
            `${url}/event/reservation?mailAddress=${mail}&idEvent=${idEvent}`,
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            return res.data.registerDate;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getRegisterByEventId = async (idEvent) => {
    return await axios
        .get(`${url}/user/reservation/consult?idEvent=${idEvent}`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getAllRegisterCurrentUser = async () => {
    return await axios
        .get(`${url}/user/reservation/consult/all`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getRegisterBtwnTimespan = async (startDate, endDate) => {
    return await axios
        .get(
            `${url}/user/reservation/consult/between?startingDate=${startDate}&endingDate=${endDate}`,
            {
                headers: { authorization: `Bearer ${getToken()}` },
            }
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addRegister = async (idEvent) => {
    return await axios
        .post(
            `${url}/user/reservation/add`,
            {
                idEvent: idEvent,
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

const addRegisterAdmin = async (idEvent, mailUser) => {
    return await axios
        .post(
            `${url}/user/reservation/admin/add`,
            {
                idEvent: idEvent,
                mailAddress: mailUser,
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

const delRegister = async (idEvent) => {
    return await axios
        .delete(`${url}/user/reservation/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                idEvent: idEvent,
            },
        })
        .then((res) => {
            console.log('registration deleted');
        })
        .catch((err) => {
            console.log(err);
        });
};

const delRegisterAdmin = async (idEvent, mailUser) => {
    return await axios
        .delete(`${url}/user/reservation/admin/delete`, {
            headers: { authorization: `Bearer ${getToken()}` },
            data: {
                idEvent: idEvent,
                mailAddress: mailUser,
            },
        })
        .then((res) => {
            console.log('registration deleted');
        })
        .catch((err) => {
            console.log(err);
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
};
