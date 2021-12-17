import { getOwnUser } from './api/User';

const logout = () => {
    sessionStorage.clear();
};

const transformDate = (d) => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const persistUser = async () => {
    try {
        const res = await getOwnUser();
        sessionStorage.setItem('userDatas', JSON.stringify(res));
    } catch (err) {
        throw err;
    }
};

const getToken = () => {
    return sessionStorage.getItem('jwtToken');
};

const getSessionUser = () => {
    const userStr = sessionStorage.getItem('userDatas');
    return JSON.parse(userStr);
};

const isLogged = () => {
    return sessionStorage.getItem('jwtToken') ? true : false;
};

const isAdmin = () => {
    if (getSessionUser()) return getSessionUser().role === 'admin';
};

const isPasswordValid = (str) => {
    const reg = new RegExp('.{6,32}');
    return reg.test(str);
};

const isEmailValid = (str) => {
    const reg = new RegExp(
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
    );
    return reg.test(str);
};

const isIdValid = (id) => {
    const reg = new RegExp(/^\d+$/g)
    return reg.test(id);
}

const isSecurityLevelValid = (lv) => {
    return (lv > 0 && lv < 6);
};

const isMaxPlaceValid = (nb) => {
    return (nb > 0 && isIdValid(nb))
}

const isPriceValid = (price) => {
    const reg = new RegExp(/\d{1,3}(?:[.,]\d{3})*(?:[.,]\d)/g)
    return (reg.test(price) && parseFloat(price) > 0);
}

const isNameValid = (name) => {
    const reg = new RegExp(/^[A-Za-zéè0-9 ,.'-]+$/g)
    return reg.test(name);
}

const isNotBlank = (str) => {
    const reg = new RegExp(/./g);
    return reg.test(str);
};

const isBirthDateValid = (birthdate) => {
    const date = new Date(birthdate);
    const yearDifference = parseInt(
        (Date.now() - date) / (1000 * 60 * 60 * 24 * 365)
    );
    const validBirthDate = yearDifference >= 18 && yearDifference <= 120;
    return validBirthDate;
};




export {
    isLogged,
    getToken,
    isAdmin,
    logout,
    transformDate,
    isNotBlank,
    persistUser,
    getSessionUser,
    isPasswordValid,
    isEmailValid,
    isBirthDateValid,
    isIdValid,
    isPriceValid,
    isNameValid,
    isSecurityLevelValid,
    isMaxPlaceValid,
};
