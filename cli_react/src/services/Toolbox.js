const isLogged = () => {
    return sessionStorage.getItem('jwtToken')?true:false;
};

const getToken = () => {
    return sessionStorage.getItem('jwtToken');
}

export {isLogged, getToken};