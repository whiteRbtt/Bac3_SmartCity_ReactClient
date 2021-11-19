import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged, isIdValid, prepareDatas } from '../../services/Toolbox';
import { errorFetching, missingId, wrongId } from '../../services/string';
import { getAllEvents } from '../../services/api/Event';
import { getAllProducts } from '../../services/api/Product';
import { getAllUsers } from '../../services/api/User';
import { getAllObject } from '../../services/api/Object';
import { getAllRegister } from '../../services/api/Participation';
import { getAllStands } from '../../services/api/Stand';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const Admin = () => {
    const [selectedTable, setSelectedTable] = useState('');
    const [currentTable, setCurrentTable] = useState();
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
                setCurrentTable(await getAllEvents());
            } else if (selectedTable === 'Utilisateur') {
                setCurrentTable(await getAllUsers());
            } else if (selectedTable === 'Produit') {
                setCurrentTable(await getAllProducts());
            } else if (selectedTable === 'Stand') {
                setCurrentTable(await getAllStands());
            } else if (selectedTable === 'Objet') {
                setCurrentTable(await getAllObject());
            } else if (selectedTable === 'Participation') {
                setCurrentTable(await getAllRegister());
            }
        } catch (err) {
            setMessage(errorFetching);
            console.error(err);
        }
    };

    const createGrid = () => {
        if (currentTable) {
            // init columns
            let columns = [];
            let colId = 1;
            for (const key in currentTable[0]) {
                columns.push({
                    field: 'col' + colId,
                    headerName: key,
                    width: 150,
                });
                colId++;
            }

            // init rows
            let rows = [];
            let rowId = 1;
            currentTable.forEach((row) => {
                let newRow = { id: rowId };
                let i = 1;
                for (const key in row) {
                    const colName = 'col' + i;
                    newRow[colName] = row[key];
                    i++;
                }
                rows.push(newRow);
                rowId++;
            });

            return <DataGrid rows={rows} columns={columns} />;
        } else {
            console.log('table vide');
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
            <div className='adminContainer'>
                <Typography variant='h3' gutterBottom component='div'>
                    lets CRUD
                </Typography>
                {message}
                <div className='adminSelectTable'>
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

                <div className='dataGrid'>{createGrid()}</div>

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
