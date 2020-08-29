import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import LandingPage from './components/views/LandingPage';
import AboutPage from './components/views/AboutPage';
import ProfilePage from './components/views/ProfilePage';
import AdminPage from './components/views/AdminPage';
import LoginPage from './components/views/LoginPage';
import RegisterPage from './components/views/RegisterPage';
import NotFoundPage from './components/views/NotFoundPage';
import NavBar from './components/views/NavBar';
import Footer from './components/views/Footer';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/about' component={Auth(AboutPage, null)} />
          <Route exact path='/profile' component={Auth(ProfilePage, true, false)} />
          <Route exact path='/admin' component={Auth(AdminPage, true, true)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}



export default App;