import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { isLogged } from '../../services/Toolbox';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import '../../App.css';
import Header from '../Header';

export default function Admin(props) {
    const [table, setTable] = React.useState('event');

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            console.log(`table`, table);
        }
        return () => {
            isMounted = false;
        };
    });

    const handleDelete = async (e) => {
        e.preventDefault();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    };

    const handleAdd = async (e) => {
        e.preventDefault();
    };

    const handleChange = (event) => {
        setTable(event.target.value);
    };

    return (
        <div>
            <Header />
            <div className='adminContainer'>
                <Typography variant='h3' gutterBottom component='div'>
                    lets CRUD
                </Typography>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            table
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='tableSelect'
                            value={table}
                            label='Table'
                            onChange={handleChange}
                        >
                            <MenuItem value={'évenements'}>évenements</MenuItem>
                            <MenuItem value={'objets'}>objets</MenuItem>
                            <MenuItem value={'participation'}>
                                participation
                            </MenuItem>
                            <MenuItem value={'stand'}>stand</MenuItem>
                            <MenuItem value={'utilisateur'}>
                                utilisateur
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <p>table</p>
                <div className='adminButtonsContainer'>
                    <Button variant='outlined' onClick={handleDelete}>
                        supprimer
                    </Button>
                    <Button variant='outlined' onClick={handleUpdate}>
                        modifier
                    </Button>
                    <Button variant='outlined' onClick={handleAdd}>
                        ajouter
                    </Button>
                </div>
            </div>
            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
}
