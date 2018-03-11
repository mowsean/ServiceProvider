import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import ServiceResult from './components/serviceResult.jsx';
import Navbar from './components/navbar.jsx';
import Jumbotron from './components/jumbotron.jsx';
import Footer from './components/footer.jsx';

ReactDOM.render(    
  <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/Service/ServiceResult" component={ServiceResult} />
            <Footer />
        </div>
    </Router>,
    document.getElementById('app')
);

