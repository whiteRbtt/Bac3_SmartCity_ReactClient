import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../../App.css';
import Header from '../Header';
import { isLogged } from '../../services/Toolbox';
import { errorFetching, delSucces, noRowSelected } from '../../services/string';
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
    const [selectedRowID, setSelectedRowId] = useState('');
    const [selectedRow, setSelectedRow] = useState('');
    const [currentTable, setCurrentTable] = useState([]);
    const [message, setMessage] = useState('');
    const [action, setAction] = useState();
    const [toggleFetching, setToggleFetching] = useState(true);

    useEffect(() => {
        let isMounted = true;
        if (isLogged() && isMounted) {
            fetchTable();
            setAction(null);
            setSelectedRowId('');
        }
        return () => {
            isMounted = false;
        };
    }, [selectedTable, toggleFetching]);

    useEffect(() => {
        if (currentTable) {
            setSelectedRow(currentTable[selectedRowID - 1]);
        }
    }, [selectedRowID]);

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
            return (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooterPagination
                    onSelectionModelChange={(e) => setSelectedRowId(e)}
                    selectionModel={selectedRowID}
                />
            );
        }
    };

    // CRUD

    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage('');
        setAction('add');
    };

    const handleRead = (e) => {
        e.preventDefault();
        setMessage('');
        setSelectedTable(e.target.value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setAction('update');
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (selectedRow) {
            try {
                if (selectedTable === 'Evenement') {
                    await delEvent(selectedRow.id);
                } else if (selectedTable === 'Utilisateur') {
                    await delUser(selectedRow.mail_address);
                } else if (selectedTable === 'Produit') {
                    await delProduct(selectedRow.id);
                } else if (selectedTable === 'Stand') {
                    await delStand(selectedRow.id_stand);
                } else if (selectedTable === 'Objet') {
                    await delRelObject(selectedRow.id_stand, selectedRow.id_product);
                } else if (selectedTable === 'Participation') {
                    await delRegisterAdmin(selectedRow.id_event, selectedRow.mail_address_user);
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
                <Typography variant='h2'>
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
                <div className='crudMessage'>{message}</div>
                <div className='dataGrid'>{createGrid()}</div>
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
                <div className='adminFormContainer'>
                    <CrUdForm
                        action={action}
                        table={selectedTable}
                        renderTable={setToggleFetching}
                        toggleValue={toggleFetching}
                        message={setMessage}
                    />
                </div>
            </div>

            {isLogged() ? null : <Redirect to='/connexion' />}
        </div>
    );
};

export default Admin;
