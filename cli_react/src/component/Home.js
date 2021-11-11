import React from 'react';
import '../App.css';
import Header from './Header';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


const Home = (props) => {
    const handleClick = () => {
        alert(sessionStorage.getItem('jwtToken'));
    };

    return (
        <div>
            <Header />
            <Button variant='contained' onClick={handleClick}>
                token
            </Button>
            <Link to={`/connexion`}>login</Link>
        </div>
    );
};

export default Home;
