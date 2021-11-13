import axios from 'axios';
const url = 'http://localhost:3001';

const login = async (mail, password) => {
    const basicAuth = Buffer.from(`${mail}:${password}`, 'utf8').toString(
        'base64'
    );
    await axios
        .post(
            `${url}/user/login`,
            {},
            {
                headers: { authorization: `Basic ${basicAuth}` },
            }
        )
        .then((res) => {
            sessionStorage.setItem('jwtToken', res.data.token);
            console.log('jwtToken stored in browser session');
        })
        .catch((err) => {
            throw err;
        });
};



export { login };
