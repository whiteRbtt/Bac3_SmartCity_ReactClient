import { useHistory } from 'react-router-dom';

import geralt from '../services/img/geralt.png';
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
            <img src={geralt} alt='gwint master' id='geralt' className='tilesImg' />
            <div className='contentTilesContainer'>
                <Typography variant='h5' className='tilesFont'>
                    {props.name.slice(0, 60)}
                </Typography>

                <Typography variant='h6' className='tilesFont'>
                    {props.city.slice(0, 30)}
                </Typography>

                <Typography variant='h7' className='tilesFont'>
                    ({props.type.slice(0, 30)})
                </Typography>
            </div>
        </div>
    );
};

export default EventTile;
