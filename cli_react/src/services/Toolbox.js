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
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
};

export { isLogged, getToken, isAdmin, logout, transformDate};
