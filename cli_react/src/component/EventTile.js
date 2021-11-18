import { useHistory } from 'react-router-dom';

import geralt from '../geralt.png';
import '../App.css';

import Typography from '@mui/material/Typography';

const EventTile = (props) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/evenement/${props.id}`);
    };

    return (
        <div className='tilesContainer' onClick={handleClick}>
            <div>
                <img
                    src={geralt}
                    alt='gwint master'
                    id='geralt'
                    className='tilesImg'
                />
            </div>
            <div className='contentTilesContainer'>
                <Typography variant='h5' gutterBottom component='div'>
                    {props.name}
                </Typography>

                <Typography variant='h6' gutterBottom component='div'>
                    {props.city}
                </Typography>

                <Typography variant='body2' gutterBottom component='div'>
                    ({props.type})
                </Typography>
            </div>
        </div>
    );
};

export default EventTile;
