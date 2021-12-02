import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import '../App.css';
import logo from '../services/img/activity.png';
import { isAdmin, logout, isLogged } from '../services/Toolbox';

import Button from '@mui/material/Button';

const Header = () => {
    const history = useHistory();
    const [location] = useState(useLocation().pathname);
    const [buttonTarget, setButtonTarget] = useState();
    const [buttonLabel, setButtonLabel] = useState();
    const [isHidden, setIsHidden] = useState(true);
    

    useEffect(() => {
        if (isLogged() & isAdmin()) {
            setIsHidden(false);
            if (location === '/admin') {
                setButtonTarget('/');
                setButtonLabel('Vers accueil');
            } else {
                setButtonTarget('/admin');
                setButtonLabel('Vers admin');
            }
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push('/connexion');
    };

    const handleClick = (e) => {
        e.preventDefault();
        history.push(buttonTarget);
    };

    return (
        <header>
            <div id='headerContainer1'>
                <img src={logo} alt='logo' id='logo' />
                <nav id='linksContainer'>
                    <Link to={`/`} className='headerLink'>
                        Accueil
                    </Link>
                    <Link to={`/rechercher`} className='headerLink'>
                        Recherche
                    </Link>
                    <Link to={`/profil`} className='headerLink'>
                        Profil
                    </Link>
                </nav>
            </div>

            <div id='headerContainer2'>
                <div id='adminButton' hidden={isHidden}>
                    <Button variant='outlined' onClick={handleClick}>
                        {buttonLabel}
                    </Button>
                </div>
                <Button variant='text' onClick={handleLogout}>
                    Déconnexion
                </Button>
            </div>
        </header>
    );
};

export default Header;
