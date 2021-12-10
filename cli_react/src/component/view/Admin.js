import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged } from '../../services/Toolbox';
import { errorFetching, delSucces, noRowSelected, noTableSelected, apiErrors } from '../../services/string';
import { getAllEvents, delEvent } from '../../services/api/Event';
import { getAllProducts, delProduct } from '../../services/api/Product';
import { getAllUsers, delUser } from '../../services/api/User';
import { getAllObject, delRelObject } from '../../services/api/Object';
import { getAllRegister, delRegisterAdmin } from '../../services/api/Participation';
import { getAllStands, delStand } from '../../services/api/Stand';
import CrUdForm from '../CrUdForm';

import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';

const Admin = () => {
    const [selectedTable, setSelectedTable] = useState('');

    const [table, setTable] = useState();
    const [row, setRow] = useState();

    const [message, setMessage] = useState();
    const [action, setAction] = useState();
    const [toggleFetching, setToggleFetching] = useState(true);

    useEffect(() => {
        let isMounted = true;

        if (isLogged() && isMounted) {
            fetchTable();

            setAction();
            setRow();
        }

        return () => {
            isMounted = false;
        };
    }, [selectedTable, toggleFetching]);

    const fetchTable = async () => {
        try {
            if (selectedTable === 'Evenement') {
                setTable(await getAllEvents());
            } else if (selectedTable === 'Utilisateur') {
                setTable(await getAllUsers());
            } else if (selectedTable === 'Produit') {
                setTable(await getAllProducts());
            } else if (selectedTable === 'Stand') {
                setTable(await getAllStands());
            } else if (selectedTable === 'Objet') {
                setTable(await getAllObject());
            } else if (selectedTable === 'Participation') {
                setTable(await getAllRegister());
            }
        } catch (err) {
            setMessage(errorFetching);
        }
    };

    const createGrid = () => {
        if (table) {
            // init columns
            let columns = [];
            let colId = 1;
            for (const key in table[0]) {
                let wth = 150;
                if (
                    ((key === 'name') & (selectedTable !== 'Utilisateur')) |
                    (key === 'name_product') |
                    (key === 'street_name')
                ) {
                    wth = 300;
                } else if (key === 'description') {
                    wth = 500;
                } else if (
                    (key === 'mail_address_creator') |
                    (key === 'mail_address_user') |
                    (key === 'mail_address')
                ) {
                    wth = 250;
                }

                columns.push({
                    field: 'col' + colId,
                    headerName: key,
                    width: wth,
                });
                colId++;
            }

            // init rows
            let rows = [];
            let rowId = 1;
            table.forEach((row) => {
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
            return (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooterPagination
                    onSelectionModelChange={(e) => handleSelectRow(e)}
                />
            );
        }
    };

    // events

    const handleSelectRow = (e) => {
        if (e[0]) setRow(table[e[0] - 1]);
    };

    const handleRead = (e) => {
        e.preventDefault();
        setMessage()
        setSelectedTable(e.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage()
        table ? setAction('add'):setMessage(noTableSelected)
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage()
        table ? row ? setAction('update') : setMessage(noRowSelected) : setMessage(noTableSelected);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (row) {
            try {
                if (selectedTable === 'Evenement') {
                    await delEvent(row.id);
                } else if (selectedTable === 'Utilisateur') {
                    await delUser(row.mail_address);
                } else if (selectedTable === 'Produit') {
                    await delProduct(row.id);
                } else if (selectedTable === 'Stand') {
                    await delStand(row.id);
                } else if (selectedTable === 'Objet') {
                    await delRelObject(row.id_stand, row.id_product);
                } else if (selectedTable === 'Participation') {
                    await delRegisterAdmin(row.id_event, row.mail_address_user);
                }
                setMessage(delSucces);
                setToggleFetching(!toggleFetching);
            } catch (err) {
                setMessage(errorFetching);
                console.error(err);
            }
        } else {
            setMessage(noRowSelected);
        }
    };

    return (
        <div>
            <Header />
            <div className='adminContainer'>
                <div className='adminSelectContainer'>
                    <Typography variant='h2' className='whiteNeon'>
                        lets CRUD
                    </Typography>
                    <div className='adminSelectTable'>
                        <FormControl fullWidth>
                            <InputLabel>Table</InputLabel>
                            <Select id='tableSelect' value={selectedTable} label='Table' onChange={handleRead}>
                                <MenuItem value={'Evenement'}>Evenements</MenuItem>
                                <MenuItem value={'Objet'}>Objets</MenuItem>
                                <MenuItem value={'Participation'}>Participations</MenuItem>
                                <MenuItem value={'Stand'}>Stands</MenuItem>
                                <MenuItem value={'Utilisateur'}>Utilisateurs</MenuItem>
                                <MenuItem value={'Produit'}>Produits</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='dataGrid'>{createGrid()}</div>
                    <Typography variant='body1' className='errorMessage'>
                        {message}
                    </Typography>
                    <div className='adminButtonsContainer'>
                        <Button variant='outlined' onClick={handleDelete}>
                            supprimer
                        </Button>
                        <Button variant='outlined' onClick={handleUpdate}>
                            modifier
                        </Button>
                        <Button variant='outlined' onClick={handleCreate}>
                            ajouter
                        </Button>
                    </div>
                </div>

                {action ? (
                    <div className='adminFormContainer'>
                        <CrUdForm
                            action={action}
                            table={selectedTable}
                            row={row}
                            renderTable={setToggleFetching}
                            toggleValue={toggleFetching}
                            message={setMessage}
                        />
                    </div>
                ) : null}
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Admin;
