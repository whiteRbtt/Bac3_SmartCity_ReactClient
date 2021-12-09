import React, { useState, useEffect } from 'react';
import '../App.css';

import {
    mailNotValid,
    strBlankError,
    missingFields,
    errorFetching,
    wrongId,
    updateSucces,
    addSucces,
    priceNotValid,
    nameNotValid,
    registerUpdateError,
    passwordNotValid,
    birthdateNotValid,
    mustBePositive,
    securityNotValid,
    noRowSelected,
    noTableSelected,
} from '../services/string';
import {
    transformDate,
    isEmailValid,
    isPasswordValid,
    isNotBlank,
    isBirthDateValid,
    isLogged,
    isIdValid,
    isPriceValid,
    isNameValid,
    isSecurityLevelValid,
    isMaxPlaceValid,
} from '../services/Toolbox';
import { addObjectRel, updateObjectRel } from '../services/api/Object';
import { addProduct, updateProduct } from '../services/api/Product';
import { addRegister } from '../services/api/Participation';
import { registerAdmin, updateUserProfile } from '../services/api/User';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Checkbox, TextField, Button, Typography } from '@mui/material';
import { addStand, updateStand } from '../services/api/Stand';
import { addEvent, updateEvent } from '../services/api/Event';

const CrUdForm = (props) => {
    const [action, setAction] = useState(props.action);
    const [table, setTable] = useState(props.table);
    const [row, setRow] = useState(props.row);
    const [message, setMessage] = useState('');

    const [standId, setStandId] = useState('');
    const [productId, setProductId] = useState('');
    const [newStandId, setNewStandId] = useState('');
    const [newProductId, setNewProductId] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [newMailAddress, setNewMailAddress] = useState('');
    const [name, setName] = useState('');
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(new Date());
    const [streetName, setStreetName] = useState('');
    const [houseNb, setHouseNb] = useState('');
    const [postCode, setPostCode] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [securityLevel, setSecurityLevel] = useState('');
    const [childrenAccepted, setChildrenAccepted] = useState(false);
    const [requireMask, setRequireMask] = useState(false);
    const [CST, setCST] = useState(false);
    const [maxPlace, setMaxPlace] = useState('');
    const [mailAddressCreator, setMailAddressCreator] = useState('');
    const [price, setPrice] = useState('');
    const [manager, setManager] = useState('');
    const [areaSize, setAreaSize] = useState(1);
    const [eventId, setEventId] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (isLogged()) {
            setMessage('');
            setAction(props.action);
            setTable(props.table);
            setRow(props.row)

            if(table){
                if(action === 'update'){
                    if (row) {
                        console.log(`bouh`)
                        switch (table) {
                            case 'Evenement':
                                break;
                            case 'Objet':
                                break;
                            case 'Participation':
                                break;
                            case 'Stand':
                                break;
                            case 'Utilisateur':
                                break;
                            case 'Produit':
                                break;
                            default:
                        }
                    } else setMessage(noRowSelected);
                } 
            }else setMessage(noTableSelected);
            
        }
    }, [props.action, props.table, props.row]);

    const confirmChanges = () => {
        action === 'add' ? props.message(addSucces) : props.message(updateSucces);
        props.renderTable(!props.toggleValue);
    };

    const addOrUpdateObject = async () => {
        if (isIdValid(standId) & isIdValid(productId)) {
            if (action === 'add') {
                await addObjectRel(parseInt(standId), parseInt(productId));
                confirmChanges();
            } else {
                if (isIdValid(newProductId) & isIdValid(newStandId)) {
                    await updateObjectRel(
                        parseInt(standId),
                        parseInt(productId),
                        parseInt(newStandId),
                        parseInt(newProductId)
                    );
                    confirmChanges();
                } else setMessage(missingFields);
            }
        } else setMessage(missingFields);
    };

    const addOrUpdateProduct = async () => {
        if (isNameValid(name) & isPriceValid(price) & isNotBlank(description)) {
            if (action === 'add') {
                await addProduct(name, description, parseFloat(price));
                confirmChanges();
            } else {
                if (isIdValid(productId)) {
                    await updateProduct(parseInt(productId), name, description, parseFloat(price));
                    confirmChanges();
                } else {
                    setMessage(wrongId);
                }
            }
        } else {
            setMessage(missingFields);
        }
    };

    const addOrUpdateRegister = async () => {
        if (isEmailValid(mailAddress) & isIdValid(eventId)) {
            await addRegister(parseFloat(eventId), mailAddress);
            confirmChanges();
        } else {
            if (action === 'add') {
                setMessage(missingFields);
            } else setMessage(registerUpdateError);
        }
    };

    const addOrUpdateUser = async () => {
        if (
            isEmailValid(mailAddress) &
            isPasswordValid(password) &
            isNameValid(name) &
            isBirthDateValid(transformDate(birthDate))
        ) {
            if (action === 'add') {
                await registerAdmin(mailAddress, password, name, transformDate(birthDate), admin ? 'admin' : 'user');
                confirmChanges();
            } else {
                if (isEmailValid(newMailAddress)) {
                    await updateUserProfile(
                        mailAddress,
                        newMailAddress,
                        password,
                        transformDate(birthDate),
                        admin ? 'admin' : 'user'
                    ); // TODO pas logique, modifier api
                    confirmChanges();
                } else {
                    setMessage(missingFields);
                }
            }
        } else {
            if (!isBirthDateValid(transformDate(birthDate))) setMessage(birthdateNotValid);
            else setMessage(missingFields);
        }
    };

    const addOrUpdateStand = async () => {
        if (isNotBlank(type) & isNameValid(manager) & (areaSize > 0) & isIdValid(eventId)) {
            if (action === 'add') {
                await addStand(type, manager, parseInt(areaSize), parseInt(eventId));
                confirmChanges();
            } else {
                if (isIdValid(standId)) {
                    await updateStand(parseInt(standId), type, manager, parseInt(areaSize), parseInt(eventId));
                    confirmChanges();
                } else {
                    setMessage(missingFields);
                }
            }
        } else setMessage(missingFields);
    };

    const addOrUpdateEvent = async () => {
        if (
            isNameValid(name) &
            isNotBlank(streetName) &
            isNotBlank(city) &
            isIdValid(postCode) &
            isNotBlank(description) &
            isNotBlank(type) &
            isSecurityLevelValid(securityLevel) &
            (maxPlace > 0)
        ) {
            if (action === 'add') {
                await addEvent(
                    name,
                    transformDate(startingDate),
                    transformDate(endingDate),
                    streetName,
                    parseInt(houseNb),
                    parseInt(postCode),
                    city,
                    childrenAccepted,
                    description,
                    type,
                    parseInt(securityLevel),
                    requireMask,
                    CST,
                    parseInt(maxPlace)
                );
                confirmChanges();
            } else {
                if (isIdValid(eventId) & isEmailValid(mailAddressCreator)) {
                    await updateEvent(
                        eventId,
                        name,
                        transformDate(startingDate),
                        transformDate(endingDate),
                        streetName,
                        parseInt(houseNb),
                        parseInt(postCode),
                        city,
                        childrenAccepted,
                        description,
                        type,
                        parseInt(securityLevel),
                        requireMask,
                        CST,
                        parseInt(maxPlace),
                        mailAddressCreator
                    );
                    confirmChanges();
                } else setMessage(missingFields);
            }
        } else setMessage(missingFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            switch (table) {
                case 'Evenement':
                    await addOrUpdateEvent();
                    break;
                case 'Objet':
                    await addOrUpdateObject();
                    break;
                case 'Participation':
                    await addOrUpdateRegister();
                    break;
                case 'Stand':
                    await addOrUpdateStand();
                    break;
                case 'Utilisateur':
                    await addOrUpdateUser();
                    break;
                case 'Produit':
                    await addOrUpdateProduct();
                    break;
                default:
                    setMessage(errorFetching);
            }
        } catch (err) {
            // TODO gérer les erreurs type "déja inséré"
            console.error(err);
            setMessage(errorFetching);
        }
    };

    return (
        <div className='crudFormContainer'>
            {console.log(`row`, row)}
            {/*------------------------------Object------------------------------*/}
            {table === 'Objet' ? (
                action === 'add' ? (
                    <div className='crudForm'>
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
                    <div className='crudForm'>
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

            {/*------------------------------Product------------------------------*/}

            {table === 'Produit' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : strBlankError}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <TextField
                            label='Price'
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            error={price === '' ? null : !isPriceValid(price)}
                            helperText={price === '' ? null : isPriceValid(price) ? null : priceNotValid}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Product ID'
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            error={productId === '' ? null : !isIdValid(productId)}
                            helperText={productId === '' ? null : isIdValid(productId) ? null : wrongId}
                        />
                        <TextField
                            label='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : strBlankError}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            error={description === '' ? null : !isNotBlank(description)}
                            helperText={description === '' ? null : isNotBlank(description) ? null : strBlankError}
                        />
                        <TextField
                            label='Price'
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            error={price === '' ? null : !isPriceValid(price)}
                            helperText={price === '' ? null : isPriceValid(price) ? null : priceNotValid}
                        />
                    </div>
                ) : null
            ) : null}

            {/*------------------------------Register------------------------------*/}

            {table === 'Participation' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Email'
                            value={mailAddress}
                            onChange={(event) => setMailAddress(event.target.value)}
                            error={mailAddress === '' ? null : !isEmailValid(mailAddress)}
                            helperText={mailAddress === '' ? null : isEmailValid(mailAddress) ? null : mailNotValid}
                        />
                        <TextField
                            label='Event id'
                            value={eventId}
                            onChange={(event) => setEventId(event.target.value)}
                            error={eventId === '' ? null : !isIdValid(eventId)}
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : wrongId}
                        />
                    </div>
                ) : action === 'update' ? null : null
            ) : null}

            {/*------------------------------User------------------------------*/}

            {table === 'Utilisateur' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Email'
                            value={mailAddress}
                            onChange={(event) => setMailAddress(event.target.value)}
                            error={mailAddress === '' ? null : !isEmailValid(mailAddress)}
                            helperText={mailAddress === '' ? null : isEmailValid(mailAddress) ? null : mailNotValid}
                        />
                        <TextField
                            label='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
                        />
                        <TextField
                            label='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={password === '' ? null : !isPasswordValid(password)}
                            helperText={password === '' ? null : isPasswordValid(password) ? null : passwordNotValid}
                        />
                        <DesktopDatePicker
                            label='Date de naissance'
                            value={birthDate}
                            minDate={new Date('1920-01-01')}
                            disableFuture
                            onChange={(newValue) => {
                                setBirthDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Est admin ?</Typography>
                            <Checkbox checked={admin} onChange={(event) => setAdmin(event.target.checked)} />
                        </div>
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Email'
                            value={mailAddress}
                            onChange={(event) => setMailAddress(event.target.value)}
                            error={mailAddress === '' ? null : !isEmailValid(mailAddress)}
                            helperText={mailAddress === '' ? null : isEmailValid(mailAddress) ? null : mailNotValid}
                        />
                        <TextField
                            label='new mail'
                            value={newMailAddress}
                            onChange={(event) => setNewMailAddress(event.target.value)}
                            error={newMailAddress === '' ? null : !isEmailValid(newMailAddress)}
                            helperText={
                                newMailAddress === '' ? null : isEmailValid(newMailAddress) ? null : mailNotValid
                            }
                        />
                        <TextField
                            label='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={password === '' ? null : !isPasswordValid(password)}
                            helperText={password === '' ? null : isPasswordValid(password) ? null : passwordNotValid}
                        />
                        <DesktopDatePicker
                            label='Date de naissance'
                            value={birthDate}
                            minDate={new Date('1920-01-01')}
                            disableFuture
                            onChange={(newValue) => {
                                setBirthDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Est admin ?</Typography>
                            <Checkbox checked={admin} onChange={(event) => setAdmin(event.target.checked)} />
                        </div>
                    </div>
                ) : null
            ) : null}

            {/*------------------------------Stand------------------------------*/}

            {table === 'Stand' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='type'
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            error={type === '' ? null : !isNotBlank(type)}
                            helperText={type === '' ? null : isNotBlank(type) ? null : strBlankError}
                        />
                        <TextField
                            label='Manager'
                            value={manager}
                            onChange={(event) => setManager(event.target.value)}
                            error={manager === '' ? null : !isNameValid(manager)}
                            helperText={manager === '' ? null : isNameValid(manager) ? null : nameNotValid}
                        />
                        <TextField
                            label='Area size'
                            value={areaSize}
                            onChange={(event) => setAreaSize(event.target.value)}
                            error={areaSize > 0 ? null : true}
                            helperText={areaSize > 0 ? null : mustBePositive}
                        />
                        <TextField
                            label='Event id'
                            value={eventId}
                            onChange={(event) => setEventId(event.target.value)}
                            error={eventId === '' ? null : !isIdValid(eventId)}
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : wrongId}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Stand id'
                            value={standId}
                            onChange={(event) => setStandId(event.target.value)}
                            error={standId === '' ? null : !isIdValid(standId)}
                            helperText={standId === '' ? null : isIdValid(standId) ? null : wrongId}
                        />
                        <TextField label='Type' value={type} onChange={(event) => setType(event.target.value)} />
                        <TextField
                            label='Manager'
                            value={manager}
                            onChange={(event) => setManager(event.target.value)}
                            error={manager === '' ? null : !isNameValid(manager)}
                            helperText={manager === '' ? null : isNameValid(manager) ? null : nameNotValid}
                        />
                        <TextField
                            label='Area size'
                            value={areaSize}
                            onChange={(event) => setAreaSize(event.target.value)}
                            error={areaSize > 0 ? null : true}
                            helperText={areaSize > 0 ? null : mustBePositive}
                        />
                        <TextField
                            label='Event id'
                            value={eventId}
                            onChange={(event) => setEventId(event.target.value)}
                            error={eventId === '' ? null : !isIdValid(eventId)}
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : wrongId}
                        />
                    </div>
                ) : null
            ) : null}

            {/*------------------------------Event------------------------------*/}

            {table === 'Evenement' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
                        />
                        <DesktopDatePicker
                            label='starting date'
                            value={startingDate}
                            minDate={new Date('1920-01-01')}
                            onChange={(newValue) => {
                                setStartingDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label='ending date'
                            value={endingDate}
                            minDate={new Date('1920-01-01')}
                            onChange={(newValue) => {
                                setEndingDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            label='street name'
                            value={streetName}
                            onChange={(event) => setStreetName(event.target.value)}
                            error={streetName === '' ? null : !isNotBlank(streetName)}
                            helperText={streetName === '' ? null : isNotBlank(streetName) ? null : strBlankError}
                        />
                        <TextField
                            label='house number (facult)'
                            value={houseNb}
                            onChange={(event) => setHouseNb(event.target.value)}
                            error={houseNb === '' ? null : !isIdValid(houseNb)}
                            helperText={houseNb === '' ? null : isIdValid(houseNb) ? null : wrongId}
                        />
                        <TextField
                            label='postcode'
                            value={postCode}
                            onChange={(event) => setPostCode(event.target.value)}
                            error={postCode === '' ? null : !isIdValid(postCode)}
                            helperText={postCode === '' ? null : isIdValid(postCode) ? null : wrongId}
                        />
                        <TextField
                            label='city name'
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            error={city === '' ? null : !isNotBlank(city)}
                            helperText={city === '' ? null : isNotBlank(city) ? null : nameNotValid}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            error={description === '' ? null : !isNotBlank(description)}
                            helperText={description === '' ? null : isNotBlank(description) ? null : strBlankError}
                        />
                        <TextField
                            label='type'
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            error={type === '' ? null : !isNotBlank(type)}
                            helperText={type === '' ? null : isNotBlank(type) ? null : strBlankError}
                        />
                        <TextField
                            label='security level'
                            value={securityLevel}
                            onChange={(event) => setSecurityLevel(event.target.value)}
                            error={securityLevel === '' ? false : !isSecurityLevelValid(securityLevel)}
                            helperText={
                                securityLevel === ''
                                    ? null
                                    : isSecurityLevelValid(securityLevel)
                                    ? null
                                    : securityNotValid
                            }
                        />
                        <TextField
                            label='Max place'
                            value={maxPlace}
                            onChange={(event) => setMaxPlace(event.target.value)}
                            error={maxPlace === '' ? null : !isMaxPlaceValid(maxPlace)}
                            helperText={maxPlace === '' ? null : isMaxPlaceValid(maxPlace) ? null : wrongId}
                        />
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Enfants :</Typography>
                            <Checkbox
                                checked={childrenAccepted}
                                onChange={(event) => setChildrenAccepted(event.target.checked)}
                            />
                        </div>
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Masque :</Typography>
                            <Checkbox
                                checked={requireMask}
                                onChange={(event) => setRequireMask(event.target.checked)}
                            />
                        </div>
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>CST :</Typography>
                            <Checkbox checked={CST} onChange={(event) => setCST(event.target.checked)} />
                        </div>
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Event id'
                            value={eventId}
                            onChange={(event) => setEventId(event.target.value)}
                            error={eventId === '' ? null : !isIdValid(eventId)}
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : wrongId}
                        />
                        <TextField
                            label='name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
                        />
                        <DesktopDatePicker
                            label='starting date'
                            value={startingDate}
                            minDate={new Date('1920-01-01')}
                            onChange={(newValue) => {
                                setStartingDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label='ending date'
                            value={endingDate}
                            minDate={new Date('1920-01-01')}
                            onChange={(newValue) => {
                                setEndingDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            label='street name'
                            value={streetName}
                            onChange={(event) => setStreetName(event.target.value)}
                            error={streetName === '' ? null : !isNotBlank(streetName)}
                            helperText={streetName === '' ? null : isNotBlank(streetName) ? null : strBlankError}
                        />
                        <TextField
                            label='house number (facult)'
                            value={houseNb}
                            onChange={(event) => setHouseNb(event.target.value)}
                            error={houseNb === '' ? null : !isIdValid(houseNb)}
                            helperText={houseNb === '' ? null : isIdValid(houseNb) ? null : wrongId}
                        />
                        <TextField
                            label='postcode'
                            value={postCode}
                            onChange={(event) => setPostCode(event.target.value)}
                            error={postCode === '' ? null : !isIdValid(postCode)}
                            helperText={postCode === '' ? null : isIdValid(postCode) ? null : wrongId}
                        />
                        <TextField
                            label='city name'
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            error={city === '' ? null : !isNotBlank(city)}
                            helperText={city === '' ? null : isNotBlank(city) ? null : nameNotValid}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            error={description === '' ? null : !isNotBlank(description)}
                            helperText={description === '' ? null : isNotBlank(description) ? null : strBlankError}
                        />
                        <TextField
                            label='type'
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            error={type === '' ? null : !isNotBlank(type)}
                            helperText={type === '' ? null : isNotBlank(type) ? null : strBlankError}
                        />
                        <TextField
                            label='security level'
                            value={securityLevel}
                            onChange={(event) => setSecurityLevel(event.target.value)}
                            error={securityLevel === '' ? false : !isSecurityLevelValid(securityLevel)}
                            helperText={
                                securityLevel === ''
                                    ? null
                                    : isSecurityLevelValid(securityLevel)
                                    ? null
                                    : securityNotValid
                            }
                        />
                        <TextField
                            label='Max place'
                            value={maxPlace}
                            onChange={(event) => setMaxPlace(event.target.value)}
                            error={maxPlace === '' ? null : !isMaxPlaceValid(maxPlace)}
                            helperText={maxPlace === '' ? null : isMaxPlaceValid(maxPlace) ? null : wrongId}
                        />
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Enfants :</Typography>
                            <Checkbox
                                checked={childrenAccepted}
                                onChange={(event) => setChildrenAccepted(event.target.checked)}
                            />
                        </div>
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>Masque :</Typography>
                            <Checkbox
                                checked={requireMask}
                                onChange={(event) => setRequireMask(event.target.checked)}
                            />
                        </div>
                        <div className='checkboxContainer'>
                            <Typography variant='body3'>CST :</Typography>
                            <Checkbox checked={CST} onChange={(event) => setCST(event.target.checked)} />
                        </div>
                        <TextField
                            label='mail creator'
                            value={mailAddressCreator}
                            onChange={(event) => setMailAddressCreator(event.target.value)}
                            error={mailAddressCreator === '' ? null : !isEmailValid(mailAddressCreator)}
                            helperText={
                                mailAddressCreator === ''
                                    ? null
                                    : isEmailValid(mailAddressCreator)
                                    ? null
                                    : mailNotValid
                            }
                        />
                    </div>
                ) : null
            ) : null}

            {/*------------------------------Good looking button------------------------------*/}
            {message?<div className='errorMessage'>{message}</div>:null}
            {((action === 'add') | (action === 'update')) & (props.table !== '') ? (
                <Button variant='contained' onClick={handleSubmit}>
                    Soumettre
                </Button>
            ) : null}
        </div>
    );
};

export default CrUdForm;

