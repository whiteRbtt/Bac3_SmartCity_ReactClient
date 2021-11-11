import React from 'react';
import '../App.css';
import Header from './Header';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


const Home = (props) => {
    const handleClick = () => {
        sessionStorage.setItem('token', document.getElementById('txt').value);
    };

    return (
        <div>
            <Header />
            <Link to={`/connexion`}>login</Link>
        </div>
    );
};

export default Home;
