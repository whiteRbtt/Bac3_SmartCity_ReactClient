import { getOwnUser } from './api/User';

const logout = () => {
    sessionStorage.clear();
};

const transformDate = (d) => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const persistUser = async () => {
    await getOwnUser()
        .then((res) => {
            sessionStorage.setItem('userDatas', JSON.stringify(res));
            return res;
        })
        .catch((err) => {
            throw err;
        });
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
    const reg = new RegExp('\\w+@\\w+\\.\\w+');
    return reg.test(str);
};

const isIdValid = (id) => {
    const reg = new RegExp(/^\d+$/g)
    return reg.test(id);
}

const strNotBlank = (str) => {
    const reg = new RegExp(/[a-zA-Z]/g);
    return reg.test(str);
};

const birthDateValidation = (birthdate) => {
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
    strNotBlank,
    persistUser,
    getSessionUser,
    isPasswordValid,
    isEmailValid,
    birthDateValidation,
    isIdValid,
};
