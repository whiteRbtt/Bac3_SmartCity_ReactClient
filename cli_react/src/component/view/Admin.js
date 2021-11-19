import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged, isIdValid } from '../../services/Toolbox';
import { errorFetching, missingId, wrongId } from '../../services/string';
import { getAllEvents } from '../../services/api/Event';
import { getAllProducts } from '../../services/api/Product';
import { getAllUsers } from '../../services/api/User';
import { getObjectsRelFromStandId } from '../../services/api/Object';
import { getRegisterByEventId } from '../../services/api/Participation';
import { getAllStands } from '../../services/api/Stand';

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
    const [id, setId] = useState(1);
    const [message, setMessage] = useState('');

    const fetchTable = async () => {
        try {

            if (selectedTable === 'Evenement') {
                setCurrentTable(await getAllEvents());

            } else if (selectedTable === 'Utilisateur') {
                setCurrentTable(await getAllUsers());

            } else if (selectedTable === 'Produit') {
                setCurrentTable(await getAllProducts());

            } else if (selectedTable === 'Stand') {
                setCurrentTable(await getAllStands());


            } else if (selectedTable === 'Objet') {
                isIdValid(id)
                    ? setCurrentTable(getObjectsRelFromStandId(id))
                    : setMessage(missingId);

            } else if (selectedTable === 'Participation') {
                isIdValid(id)
                    ? setCurrentTable(setCurrentTable(getRegisterByEventId(id)))
                    : setMessage(missingId);
            }
        } catch (err) {
            setMessage(errorFetching);
            console.error(err);

        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchTable()
        console.log(`currentTable`, currentTable)
    }

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
            {console.log(`currentTable`, currentTable)}
            <div className='adminContainer'>
                <Typography variant='h3' gutterBottom component='div'>
                    lets CRUD
                </Typography>
                {message}
                <div className='adminSelectTable'>
                    <div className='adminSelect'>
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
                    </div>
                    <div className='adminId'>
                        <TextField
                            label='ID'
                            value={id}
                            onChange={(event) => setId(event.target.value)}
                        />
                    </div>

                    <Button variant='outlined' onClick={handleSearch}>
                        Afficher
                    </Button>

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
