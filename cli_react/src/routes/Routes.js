import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../component/Home';
import Admin from '../component/Admin';
import Event from '../component/Event';
import Register from '../component/Register';
import Login from '../component/Login';
import Profile from '../component/Profile';
import Research from '../component/Research';
import Settings from '../component/Settings';

export default function Routes() {    
	return (        
			<Router>            
					<Switch>  

						<Route exact path='/' component={Home}></Route>
                        <Route path='/profil' component={Profile}></Route>      
                        <Route path='/param' component={Settings}></Route>                  
                        <Route path='/rechercher' component={Research}></Route>
                        <Route path='/admin' component={Admin}></Route>
                        <Route path='/inscription' component={Register}></Route>
                        <Route path='/admin' component={Admin}></Route>
                        <Route path='/connexion' component={Login}></Route>
                        <Route path='/evenement/:id' component={Event}></Route>
                        
					</Switch>        
			</Router>    
	);
}