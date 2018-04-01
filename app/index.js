import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import Home from './components/home.js';
import Login from './components/login.js';
import Signup from './components/signup.js';
import ServiceResult from './components/serviceResult.js';
import Navbar from './components/navbar.js';
import Jumbotron from './components/jumbotron.js';
import Footer from './components/footer.js';
import PartnershipAccount from './components/partnershipAccount.js';
import Appointment from "./components/appointment.js";
import ScheduleAppointment from "./components/scheduleappointment.js";
ReactDOM.render(    
  <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/partnershipaccount" component={PartnershipAccount} />
            <Route path="/service/result" component={ServiceResult} />
            <Route path="/service/appointment" component={Appointment} />
            <Route path="/service/scheduleappointment" component={ScheduleAppointment} />
            
            <Footer />
        </div>
    </Router>,
    document.getElementById('app')
);

