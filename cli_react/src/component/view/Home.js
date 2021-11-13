import React from 'react';
import { Link, Redirect } from 'react-router-dom';


import '../../App.css';
import Header from '../Header';
import isLogged from '../../services/Toolbox'
import { login } from '../../services/api/User';



import Button from '@mui/material/Button';


const Home = (props) => {
    const handleClick = async () => {
        //alert(sessionStorage.getItem('jwtToken'));
        try {
            //await login('geralt@pm.me','ablette');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <Header />
            <Button variant='contained' 
                onClick={handleClick}
                style={{margin:"100px 0px 0px 0px"}}
            >
                token
            </Button>
            <Link to={`/connexion`}>login</Link>
            {/* {isLogged() ?null:<Redirect to='/connexion' />} */}
        </div>
    );
};

export default Home;
