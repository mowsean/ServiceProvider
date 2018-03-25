import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import ServiceResult from './components/serviceResult.jsx';
import Navbar from './components/navbar.jsx';
import Jumbotron from './components/jumbotron.jsx';
import Footer from './components/footer.jsx';
import PartnershipAccount from './components/partnershipAccount.jsx';
import Appointment from "./components/appointment.jsx";
import ScheduleAppointment from "./components/scheduleappointment.jsx";
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

