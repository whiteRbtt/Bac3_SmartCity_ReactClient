import React from 'react';
import '../App.css';
import Header from './Header'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


const Login = (props) => {

    const handleClick = () => {
        alert("ok")
    };

    return (
        <div>
            <Header/>
            <div className="login">
                <div className="loginContainer">
                    <TextField id="mail" label="Mail" variant="outlined" />
                    <TextField id="mail" label="Mot de passe" variant="outlined" />
                    <Button variant="contained" onClick={handleClick}>Connexion</Button>
                    <Link to={`/inscription`} className='registerLink'>Inscription</Link>
                </div>
            </div> 
        </div>
    );
}

export default Login;