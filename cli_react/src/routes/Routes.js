import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../component/view/Home';
import Admin from '../component/view/Admin';
import Event from '../component/view/Event';
import Register from '../component/view/Register';
import Login from '../component/view/Login';
import Profile from '../component/view/Profile';
import Research from '../component/view/Research';
import Settings from '../component/view/Settings';

export default function Routes() {    
	return (
        <Router>
            <Switch>
                <Route path='/profil' component={Profile} />
                <Route path='/param' component={Settings} />
                <Route path='/rechercher' component={Research} />
                <Route path='/admin' component={Admin} />
                <Route path='/inscription' component={Register} />
                <Route path='/admin' component={Admin} />
                <Route path='/connexion' component={Login} />
                <Route path='/evenement/:id' component={Event} />
                <Route path='/' component={Home} />
            </Switch>
        </Router>
    );
}