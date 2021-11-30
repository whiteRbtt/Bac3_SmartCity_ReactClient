import React, { useState, useEffect } from 'react';
import '../App.css';

import {
    mailNotValid,
    minMaxCharNeeded,
    strBlankError,
    missingFields,
    ageMin,
    samePwd,
    registerSucces,
    errorFetching,
    missingId,
    wrongId,
    wrongFields,
    updateSucces,
    addSucces,
    priceNotValid,
} from '../services/string';
import {
    transformDate,
    persistUser,
    isEmailValid,
    isPasswordValid,
    strNotBlank,
    birthDateValidation,
    isLogged,
    isIdValid,
    isPriceValid,
    isNameValid,
} from '../services/Toolbox';
import { addObjectRel, updateObjectRel } from '../services/api/Object';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { addProduct, updateProduct } from '../services/api/Product';

const CrUdForm = (props) => {
    const [action, setAction] = useState(props.action);
    const [table, setTable] = useState(props.table);
    const [message, setMessage] = useState('');

    const [standId, setStandId] = useState('');
    const [productId, setProductId] = useState('');
    const [newStandId, setNewStandId] = useState('');
    const [newProductId, setNewProductId] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [name, setName] = useState('');
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(new Date());
    const [streetName, setStreetName] = useState('');
    const [houseNb, setHouseNb] = useState('');
    const [postCode, setPostCode] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [securityLevel, setSecurityLevel] = useState(1);
    const [childrenAccepted, setChildrenAccepted] = useState(false);
    const [requireMask, setRequireMask] = useState(false);
    const [CST, setCST] = useState(false);
    const [maxPlace, setMaxPlace] = useState('');
    const [mailAddressCreator, setMailAddressCreator] = useState('');
    const [price, setPrice] = useState('');
    const [manager, setManager] = useState('');
    const [areaSize, setAreaSize] = useState('');
    const [eventId, setEventId] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [role, setRole] = useState('user');

    useEffect(() => {
        if (isLogged()) {
            setMessage('');
            setAction(props.action);
            setTable(props.table);
        }
    }, [props.action, props.table]);

    const addOrUpdateObject = async () => {
        if (isIdValid(standId) & isIdValid(productId)) {
            if (action === 'update') {
                if (isIdValid(newProductId) & isIdValid(newStandId)) {
                    await updateObjectRel(
                        parseInt(standId),
                        parseInt(productId),
                        parseInt(newStandId),
                        parseInt(newProductId)
                    );
                } else setMessage(missingId);
            } else {
                await addObjectRel(parseInt(standId), parseInt(productId));
            }
        } else setMessage(missingId);
    };

    const addOrUpdateProduct = async () => {
        if (isNameValid(name)) {
            if (isPriceValid(price)) {
                if (action === 'add') {
                    await addProduct(name, description, price);
                } else {
                    if (isIdValid(productId)) {
                        await updateProduct(isIdValid(productId), isNameValid(name), description, isPriceValid(price));
                    } else setMessage(wrongId);
                }
            } else setMessage(priceNotValid);
        } else setMessage(strBlankError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            switch (props.table) {
                case 'Evenement':
                    break;
                case 'Objet':
                    await addOrUpdateObject();
                    break;
                case 'Participation':
                    break;
                case 'Stand':
                    break;
                case 'Utilisateur':
                    break;
                case 'Produit':
                    await addOrUpdateProduct();
                    break;
                default:
                    setMessage(errorFetching);
            }
            action === 'add' ? props.message(addSucces) : props.message(updateSucces);
            props.renderTable(!props.toggleValue);
        } catch (err) {
            // TODO gérer les erreurs perso
            console.error(err);
            setMessage(errorFetching);
        }
    };

    return (
        <div className='crudFormContainer'>
            {message}

            {/*------------------------------Object------------------------------*/}
            {table === 'Objet' ? (
                action === 'add' ? (
                    <div className='crudFormContainer'>
                        <TextField
                            label='Stand ID'
                            value={standId}
                            onChange={(event) => setStandId(event.target.value)}
                            error={standId === '' ? null : !isIdValid(standId)}
                            helperText={standId === '' ? null : isIdValid(standId) ? null : wrongId}
                        />
                        <TextField
                            label='Product ID'
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            error={productId === '' ? null : !isIdValid(productId)}
                            helperText={productId === '' ? null : isIdValid(productId) ? null : wrongId}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudFormContainer'>
                        <TextField
                            label='Stand ID'
                            value={standId}
                            onChange={(event) => setStandId(event.target.value)}
                            error={standId === '' ? null : !isIdValid(standId)}
                            helperText={standId === '' ? null : isIdValid(standId) ? null : wrongId}
                        />

                        <TextField
                            label='new stand ID'
                            value={newStandId}
                            onChange={(event) => setNewStandId(event.target.value)}
                            error={newStandId === '' ? null : !isIdValid(newStandId)}
                            helperText={newStandId === '' ? null : isIdValid(newStandId) ? null : wrongId}
                        />

                        <TextField
                            label='Product ID'
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            error={productId === '' ? null : !isIdValid(productId)}
                            helperText={productId === '' ? null : isIdValid(productId) ? null : wrongId}
                        />

                        <TextField
                            label='new product ID'
                            value={newProductId}
                            onChange={(event) => setNewProductId(event.target.value)}
                            error={newProductId === '' ? null : !isIdValid(newProductId)}
                            helperText={newProductId === '' ? null : isIdValid(newProductId) ? null : wrongId}
                        />
                    </div>
                ) : null
            ) : null}

            {/*------------------------------Register------------------------------*/}

            {/*------------------------------Event------------------------------*/}

            {/*------------------------------Product------------------------------*/}

            {/*------------------------------Stand------------------------------*/}

            {/*------------------------------User------------------------------*/}

            {((action === 'add') | (action === 'update')) & (props.table !== '') ? (
                <Button variant='contained' onClick={handleSubmit}>
                    Soumettre
                </Button>
            ) : null}
        </div>
    );
};

export default CrUdForm;

/*
----------------- create ---------------------

event
{
    "name":"Tournoi de Beauclair",
    "startingDate": "1970-05-06",
    "endingDate": "1970-09-06",
    "streetName":"Tertre des vaincus",
    "houseNumber":11, (FACULT)
    "postalCode":5555,
    "city":"Beauclair",
    "childrenAccepted" : true,
    "description":"Tournoi de chevalerie en honneur dela duchesse Anna-Henrietta de Toussaint",
    "type":"Tournois",
    "securityLevel":4,
    "requireMask" : false,
    "requireCovidSafeTicket" : false,
    "maxPlaceCount":500
}

object
{
    "idStand":3,
    "idProduct": 15
}

register
{
    "idEvent":9,
    "mailAddress":"yena@pm.me"
}

product
{
    "name": "oeuf de fabergé",
    "description": "rêve de tsarinne",
    "price": 15000000
}

stand
{
    "type":"Maison de joie",
    "managerName":"Jasquier",
    "areaSize":150,
    "idEvent":1
}

user
{
    "mailAddress":"yena@pm.me",
    "password":"ciri4life",
    "name":"yenefer de vengerberg",
    "birthdate":"1990-04-10",
    "role":"admin"
}


----------------- update ---------------------

event
{
    "idEvent" : 10,
    "name":"Tournoi de Beauclair",
    "startingDate": "1970-05-06",
    "endingDate": "1970-09-06",
    "streetName":"Tertre des vaincus",
    "houseNumber":11, (FACULT)
    "postalCode":5555,
    "city":"Beauclair",
    "childrenAccepted" : true,
    "description":"Tournoi de chevalerie en honneur dela duchesse Anna-Henrietta de Toussaint",
    "type":"Tournois",
    "securityLevel":4,
    "requireMask" : false,
    "requireCovidSafeTicket" : false,
    "maxPlaceCount":500,
    "mailAddressCreator" : "goldbridge@gmail.be"
}

object
{
    "idStand":1,
    "idProduct":1,
    "newIdStand":1,
    "newIdProduct":15
}

register
{
    nothing, delete and add a new register
}

product
{
    "idProduct": 15,
    "name": "loginus spear",
    "description": "A spear to slay gods",
    "price": 0.000
}

stand
{
    "idStand": 16,
    "type": "buvette au passiflore",
    "manager_name": "zoltan chivai",
    "area_size": 150,
    "id_event": 11
}

user
{
    "userMailAddress":"geralt@pm.me",
    "newUserMailAddress":"whitewolf@pm.me",
    "password":"iloveyen&ciri",
    "birthdate":"1950-11-25",
    "role":"user"
}


*/
