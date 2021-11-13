import React, { useState, useEffect } from 'react';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';

import '../App.css';
import logo from '../logo.svg';

import Button from '@mui/material/Button';

const Header = (props) => {
    const history = useHistory();
    const [buttonTarget, setButtonTarget] = useState();
    const [buttonLabel, setButtonLabel] = useState();
    const [location] = useState(useLocation().pathname);

    useEffect(() => {
        if (location === '/admin') {
            setButtonTarget('/');
            setButtonLabel('Vers accueil');
        } else {
            setButtonTarget('/admin');
            setButtonLabel('Vers admin');
        }
    }, []);

    const handleClick = () => {
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

                <div>
                    <Button variant='outlined' onClick={handleClick}>
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default withRouter(Header);
