import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged } from '../../services/Toolbox';
import { errorFetching } from '../../services/string';
import { getAllEvents } from '../../services/api/Event';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function Admin(props) {
    const [currentTable, setCurrentTable] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            fetchTable();
        }
        return () => {
            isMounted = false;
        };
    }, [selectedTable]);

    const fetchTable = async () => {
        try {
            if (selectedTable === 'Evenement') {
                const res = await getAllEvents();
                console.log(`res`, res);
                const arr = [];
                arr.push(res);
                // setCurrentTable(arr);
                // console.log(currentTable);

            } else if (selectedTable === 'Objet') {
                setCurrentTable();
            } else if (selectedTable === 'Participation') {
                setCurrentTable();
            } else if (selectedTable === 'Stand') {
                setCurrentTable();
            } else if (selectedTable === 'Utilisateur') {
                setCurrentTable();
            } else if (selectedTable === 'Produit') {
                setCurrentTable();
            }
            setSelectedTable('');
        } catch (err) {
            setMessage(errorFetching);
            console.error(err);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    };

    const handleAdd = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Header />
            {currentTable}
            <div className='adminContainer'>
                <Typography variant='h3' gutterBottom component='div'>
                    lets CRUD
                </Typography>
                <div className='adminSelectContainer'>
                    <FormControl fullWidth>
                        <InputLabel>Table</InputLabel>
                        <Select
                            id='tableSelect'
                            value={selectedTable}
                            label='Table'
                            onChange={(event) =>
                                setSelectedTable(event.target.value)
                            }
                        >
                            <MenuItem value={'Evenement'}>évenements</MenuItem>
                            <MenuItem value={'Objet'}>objets</MenuItem>
                            <MenuItem value={'Participation'}>
                                participation
                            </MenuItem>
                            <MenuItem value={'Stand'}>stand</MenuItem>
                            <MenuItem value={'Utilisateur'}>
                                utilisateur
                            </MenuItem>
                            <MenuItem value={'Produit'}>Produit</MenuItem>
                        </Select>
                    </FormControl>
                    {message}
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
