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

export { isLogged, getToken, isAdmin, logout };
