import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged, isIdValid } from '../../services/Toolbox';
import { errorFetching, missingId, wrongId } from '../../services/string';
import { getAllEvents } from '../../services/api/Event';
import { getAllProducts } from '../../services/api/Product';
import { getAllUsers } from '../../services/api/User';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';

const Admin = () => {
    const [selectedTable, setSelectedTable] = useState('');
    const [currentTable, setCurrentTable] = useState();
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            selectedTable === 'Objet' ||
            selectedTable === 'Participation' ||
            selectedTable === 'Stand'
                ? (id && isIdValid(id))
                    ? fetchTable()
                    : setMessage(missingId)
                : fetchTable();
        }
        return () => {
            isMounted = false;
        };
    }, [selectedTable]);

    const fetchTable = async () => {
        try {
            if (selectedTable === 'Evenement') {
                setCurrentTable(await getAllEvents());
            } else if (selectedTable === 'Objet') {
                setCurrentTable();
            } else if (selectedTable === 'Participation') {
                setCurrentTable();
            } else if (selectedTable === 'Stand') {
                setCurrentTable();
            } else if (selectedTable === 'Utilisateur') {
                setCurrentTable(await getAllUsers());
            } else if (selectedTable === 'Produit') {
                setCurrentTable(await getAllProducts());
            }
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
            {console.log(`currentTable`, currentTable)}
            <Header />
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

                    {/* <TextField
                        label='ID'
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        error={id === '' ? null : !isIdValid(id)}
                        helperText={
                            id === '' ? null : isIdValid(id) ? null : wrongId
                        }
                    /> */}

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
};

export default Admin;
