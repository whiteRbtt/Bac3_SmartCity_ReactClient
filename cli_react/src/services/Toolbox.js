import { getOwnUser } from './api/User';

const isLogged = () => {
    return sessionStorage.getItem('jwtToken') ? true : false;
};

const logout = () => {
    sessionStorage.clear();
};

const isAdmin = async () => {
    const user = await getOwnUser();
    if (user) return user.role === 'admin';
};

const getToken = () => {
    return sessionStorage.getItem('jwtToken');
};

const transformDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

const isStrValid = (str) => {
    const reg = new RegExp(/[a-zA-Z]/g); // check si c'est pas juste des whitespace
    return reg.test(str);
};

export { isLogged, getToken, isAdmin, logout, transformDate, isStrValid };
