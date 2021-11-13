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