import '../App.css';
import { Link, withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import Button from '@mui/material/Button';
import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location.pathname,
            buttonTarget: '',
            buttonContent: '',
        };
    }

    componentDidMount() {
        if (this.state.location === '/admin') {
            this.setState({ buttonTarget: '/' });
            this.setState({ buttonContent: 'Vers accueil' });
        } else {
            this.setState({ buttonTarget: '/admin' });
            this.setState({ buttonContent: 'Vers Admin' });
        }
    }

    handleClick  = () => {
        this.props.history.push(this.state.buttonTarget);
    }

    render() {
        return (
            <header>
                <div className='headerContainer'>

                    <div>
                        <img src={logo} alt='logo' id='logo'/>
                    </div>

                    <div>
                        <nav className='linkContainer'>
                            <Link to={`/`} className='headerLink'>
                                Accueil
                            </Link>
                            <Link to={`/rechercher`} className='headerLink'>
                                Recherche
                            </Link>
                            <Link to={`/profil`} className='headerLink'>
                                Profil
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <Button variant='outlined' onClick={this.handleClick}>
                            {this.state.buttonContent}
                        </Button>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
