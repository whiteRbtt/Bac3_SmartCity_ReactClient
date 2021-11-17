import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import '../App.css';
import logo from '../logo.svg';
import { isAdmin, logout, isLogged } from '../services/Toolbox';

import Button from '@mui/material/Button';

const Header = (props) => {
    const history = useHistory();
    const [buttonTarget, setButtonTarget] = useState();
    const [buttonLabel, setButtonLabel] = useState();
    const [location] = useState(useLocation().pathname);

    useEffect(() => {
        if(isLogged()){
            displayAdminButton();
        }
    }, []);

    const displayAdminButton = () => {
        if(isAdmin()){
            const adminButton = document.getElementById(
                'toAdminButtonContainer'
            );
            adminButton.hidden = false;

            if (location === '/admin') {
                setButtonTarget('/');
                setButtonLabel('Vers accueil');
            } else {
                setButtonTarget('/admin');
                setButtonLabel('Vers admin');
            }
        }
    };

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
            <div className='headerContainer'>
                <div>
                    <img src={logo} alt='logo' id='logo' />
                </div>

                <div>
                    <nav className='linkContainer'>
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

                <div id='toAdminButtonContainer' hidden={true}>
                    <Button variant='outlined' onClick={handleClick}>
                        {buttonLabel}
                    </Button>
                </div>

                <div>
                    <Button variant='text' onClick={handleLogout}>
                        Déconnexion
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
