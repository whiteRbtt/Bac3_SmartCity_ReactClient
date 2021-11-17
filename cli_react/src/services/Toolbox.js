import { getOwnUser } from './api/User';

const isLogged = () => {
    return sessionStorage.getItem('jwtToken') ? true : false;
};

const logout = () => {
    sessionStorage.clear();
};

const isAdmin = () => {
    if(getSessionUser())
        return getSessionUser().role === 'admin'
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

const persistUser = async () => {
    await getOwnUser()
            .then((res) => {
                sessionStorage.setItem('userDatas', JSON.stringify(res));
                console.log('user stored in browser session')
            })
            .catch(() => {
                alert('Une erreur est survenue, merci de réessayer plus tard');
            });
}

const getSessionUser = () => {
    const userStr = sessionStorage.getItem('userDatas')
    return JSON.parse(userStr);
}


export { isLogged, getToken, isAdmin, logout, transformDate, isStrValid, persistUser, getSessionUser};
