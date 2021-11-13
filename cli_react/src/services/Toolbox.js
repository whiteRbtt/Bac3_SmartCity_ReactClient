const isLogged = () => {
    return sessionStorage.getItem('jwtToken')?true:false;
};

export default isLogged;