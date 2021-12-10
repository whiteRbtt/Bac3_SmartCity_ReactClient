import React, { useState, useEffect } from 'react';
import '../App.css';

import {
    mailNotValid,
    blankFieldError,
    missingFields,
    errorFetching,
    idNotValid,
    updateSucces,
    addSucces,
    priceNotValid,
    nameNotValid,
    passwordHelper,
    birthdateNotValid,
    mustBePositive,
    securityNotValid,
    apiErrors
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
import { updateRegister, addRegisterAdmin } from '../services/api/Participation';
import { registerAdmin, updateUserProfile } from '../services/api/User';
import { addStand, updateStand } from '../services/api/Stand';
import { addEvent, updateEvent } from '../services/api/Event';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Checkbox, TextField, Button, Typography } from '@mui/material';
import { TryOutlined } from '@mui/icons-material';

const CrUdForm = (props) => {

    const [action, setAction] = useState();
    const [table, setTable] = useState();
    const [row, setRow] = useState();
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
    const [securityLevel, setSecurityLevel] = useState(1);
    const [childrenAccepted, setChildrenAccepted] = useState(false);
    const [requireMask, setRequireMask] = useState(false);
    const [CST, setCST] = useState(false);
    const [maxPlace, setMaxPlace] = useState('');
    const [mailAddressCreator, setMailAddressCreator] = useState('');
    const [price, setPrice] = useState('');
    const [manager, setManager] = useState('');
    const [areaSize, setAreaSize] = useState(1);
    const [eventId, setEventId] = useState('');
    const [newEventId, setNewEventId] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (isLogged()) {
            setMessage('');
            setAction(props.action);
            setTable(props.table);
            setRow(props.row);
        }
    }, [props.action, props.table, props.row]);

    useEffect(() => {
        if (action === 'update') {
            switch (table) {
                case 'Evenement':
                    setEventId(row.id);
                    setName(row.name);
                    setStartingDate(new Date(row.starting_date));
                    setEndingDate(new Date(row.ending_date));

                    setDescription(row.description);
                    setType(row.type);
                    setSecurityLevel(row.security_level);
                    setMaxPlace(row.max_place_count);
                    setMailAddressCreator(row.mail_address_creator);

                    setStreetName(row.street_name);
                    row.house_number ? setHouseNb(row.house_number) : setHouseNb('');
                    setCity(row.city);
                    setPostCode(row.postal_code);

                    setChildrenAccepted(row.children_accepted);
                    setCST(row.require_covid_safe_ticket);
                    setRequireMask(row.require_mask);

                    break;
                case 'Objet':
                    setProductId(row.id_product);
                    setStandId(row.id_stand);
                    break;
                case 'Stand':
                    setStandId(row.id);
                    setType(row.type);
                    setManager(row.manager_name);
                    setAreaSize(row.area_size);
                    setEventId(row.id_event);
                    break;
                case 'Utilisateur':
                    setMailAddress(row.mail_address);
                    setName(row.name)
                    row.role === 'admin' ? setAdmin(true) : setAdmin(false);
                    setBirthDate(new Date(row.birthdate));
                    break;
                case 'Produit':
                    setProductId(row.id);
                    setName(row.name);
                    setDescription(row.description);
                    setPrice(row.price);
                    break;
                case 'Participation':
                    setEventId(row.id_event);
                    setMailAddress(row.mail_address_user);
                    break;
                default:
            }
        } else {
            setNewEventId('');
            setEventId('');
            setName('');
            setStartingDate(new Date());
            setEndingDate(new Date());
            setDescription('');
            setType('');
            setSecurityLevel(1);
            setMaxPlace('');
            setMailAddressCreator('');
            setStreetName('');
            setHouseNb('');
            setCity('');
            setPostCode('');
            setChildrenAccepted(false);
            setCST(false);
            setRequireMask(false);
            setProductId('');
            setStandId('');
            setStandId('');
            setType('');
            setManager('');
            setAreaSize(1);
            setEventId('');
            setMailAddress('');
            setAdmin(false);
            setBirthDate(new Date());
            setProductId('');
            setName('');
            setDescription('');
            setPrice('');
        }
    }, [row, action]);

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
                    setMessage(idNotValid);
                }
            }
        } else {
            setMessage(missingFields);
        }
    };

    const addOrUpdateRegister = async () => {
        if (isEmailValid(mailAddress) & isIdValid(eventId)) {
            if (action === 'add') {
                await addRegisterAdmin(parseFloat(eventId), mailAddress);
                confirmChanges();
            } else {
                if (newEventId ? isIdValid(newEventId) : true) {
                    await updateRegister(
                        parseInt(eventId),
                        mailAddress,
                        transformDate(new Date()),
                        newEventId ? parseInt(newEventId) : parseInt(eventId),
                        mailAddress
                    );
                    confirmChanges();
                } else setMessage(missingFields);
            }
            confirmChanges();
        } else setMessage(missingFields);
    };

    const addOrUpdateUser = async () => {
        if (
            isEmailValid(mailAddress) &
            isNameValid(name) &
            isBirthDateValid(transformDate(birthDate))
        ) {
            if (action === 'add') {
                await registerAdmin(mailAddress, name, transformDate(birthDate), admin ? 'admin' : 'user');
                confirmChanges();
            } else {
                if (newMailAddress ? isEmailValid(newMailAddress) : true) {
                    await updateUserProfile(
                        mailAddress,
                        newMailAddress ? newMailAddress : undefined,
                        transformDate(birthDate),
                        admin ? 'admin' : 'user',
                        name
                    );
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
                    houseNb ? parseInt(houseNb) : undefined,
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
                        houseNb ? parseInt(houseNb) : undefined,
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
            }
        } catch (err) {
            setMessage(apiErrors[err.response.data.error] ?? errorFetching);
        }
    };

    return (
        <div className='crudFormContainer'>
            {/*------------------------------Object------------------------------*/}
            {table === 'Objet' ? (
                action === 'add' ? (
                    <div className='crudForm'>
                        <TextField
                            label='Stand ID'
                            value={standId}
                            onChange={(event) => setStandId(event.target.value)}
                            error={standId === '' ? null : !isIdValid(standId)}
                            helperText={standId === '' ? null : isIdValid(standId) ? null : idNotValid}
                        />
                        <TextField
                            label='Product ID'
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            error={productId === '' ? null : !isIdValid(productId)}
                            helperText={productId === '' ? null : isIdValid(productId) ? null : idNotValid}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField label='Stand ID' value={standId} disabled={true} />

                        <TextField
                            label='new stand ID'
                            value={newStandId}
                            onChange={(event) => setNewStandId(event.target.value)}
                            error={newStandId === '' ? null : !isIdValid(newStandId)}
                            helperText={newStandId === '' ? null : isIdValid(newStandId) ? null : idNotValid}
                        />

                        <TextField label='Product ID' value={productId} disabled={true} />

                        <TextField
                            label='new product ID'
                            value={newProductId}
                            onChange={(event) => setNewProductId(event.target.value)}
                            error={newProductId === '' ? null : !isIdValid(newProductId)}
                            helperText={newProductId === '' ? null : isIdValid(newProductId) ? null : idNotValid}
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
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
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
                        <TextField label='Product ID' value={productId} disabled={true} />
                        <TextField
                            label='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            error={description === '' ? null : !isNotBlank(description)}
                            helperText={description === '' ? null : isNotBlank(description) ? null : blankFieldError}
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
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : idNotValid}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField label='Event id' value={eventId} disabled={true} />
                        <TextField label='Email' value={mailAddress} disabled={true} />
                        <TextField
                            label='New event id'
                            value={newEventId}
                            onChange={(event) => setNewEventId(event.target.value)}
                            error={newEventId === '' ? null : !isIdValid(newEventId)}
                            helperText={newEventId === '' ? null : isIdValid(newEventId) ? null : idNotValid}
                        />
                    </div>
                ) : null
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
                            helperText={password === '' ? null : isPasswordValid(password) ? null : passwordHelper}
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
                        <TextField label='Email' value={mailAddress} disabled={true} />
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
                            label='Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={name === '' ? null : !isNameValid(name)}
                            helperText={name === '' ? null : isNameValid(name) ? null : nameNotValid}
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
                            helperText={type === '' ? null : isNotBlank(type) ? null : blankFieldError}
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
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : idNotValid}
                        />
                    </div>
                ) : action === 'update' ? (
                    <div className='crudForm'>
                        <TextField label='Stand id' value={standId} disabled={true} />
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
                            helperText={eventId === '' ? null : isIdValid(eventId) ? null : idNotValid}
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
                            helperText={streetName === '' ? null : isNotBlank(streetName) ? null : blankFieldError}
                        />
                        <TextField
                            label='house number (facult)'
                            value={houseNb}
                            onChange={(event) => setHouseNb(event.target.value)}
                            error={houseNb === '' ? null : !isIdValid(houseNb)}
                            helperText={houseNb === '' ? null : isIdValid(houseNb) ? null : idNotValid}
                        />
                        <TextField
                            label='postcode'
                            value={postCode}
                            onChange={(event) => setPostCode(event.target.value)}
                            error={postCode === '' ? null : !isIdValid(postCode)}
                            helperText={postCode === '' ? null : isIdValid(postCode) ? null : idNotValid}
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
                            helperText={description === '' ? null : isNotBlank(description) ? null : blankFieldError}
                        />
                        <TextField
                            label='type'
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            error={type === '' ? null : !isNotBlank(type)}
                            helperText={type === '' ? null : isNotBlank(type) ? null : blankFieldError}
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
                            helperText={maxPlace === '' ? null : isMaxPlaceValid(maxPlace) ? null : idNotValid}
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
                        <TextField label='Event id' value={eventId} disabled={true} />
                        <TextField label='mail creator' value={mailAddressCreator} disabled={true} />
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
                            helperText={streetName === '' ? null : isNotBlank(streetName) ? null : blankFieldError}
                        />
                        <TextField
                            label='house number (facultatif)'
                            value={houseNb}
                            onChange={(event) => setHouseNb(event.target.value)}
                            error={houseNb === '' ? null : !isIdValid(houseNb)}
                            helperText={houseNb === '' ? null : isIdValid(houseNb) ? null : idNotValid}
                        />
                        <TextField
                            label='postcode'
                            value={postCode}
                            onChange={(event) => setPostCode(event.target.value)}
                            error={postCode === '' ? null : !isIdValid(postCode)}
                            helperText={postCode === '' ? null : isIdValid(postCode) ? null : idNotValid}
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
                            helperText={description === '' ? null : isNotBlank(description) ? null : blankFieldError}
                        />
                        <TextField
                            label='type'
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            error={type === '' ? null : !isNotBlank(type)}
                            helperText={type === '' ? null : isNotBlank(type) ? null : blankFieldError}
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
                            helperText={maxPlace === '' ? null : isMaxPlaceValid(maxPlace) ? null : idNotValid}
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
                ) : null
            ) : null}

            {/*------------------------------Good looking button------------------------------*/}
            {message ? (
                <Typography variant='body2' className='errorMessage'>
                    {message}
                </Typography>
            ) : null}
            <Button variant='contained' onClick={handleSubmit}>
                Soumettre
            </Button>
        </div>
    );
};

export default CrUdForm;
