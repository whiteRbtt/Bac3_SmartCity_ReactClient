import React, { useState, useEffect } from 'react';
import '../App.css';

import Typography from '@mui/material/Typography';

const CrUdForm = (props) => {
    
    return (
        <div className='crudFormContainer'>

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





