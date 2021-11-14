import axios from 'axios';

import { getToken } from '../Toolbox';

const url = 'http://localhost:3001';

const getAllEvents = async () => {
    return await axios
        .get(`${url}/event/all`, {
            headers: { authorization: `Bearer ${getToken()}` },
        })
        .then((res) => {
            const events = res.data.events;
            return events;
        })
        .catch((err) => {
            console.log(err);
        });
};



export { getAllEvents };
