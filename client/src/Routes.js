import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Home from './components/home/home.js';


const Routes = ({ store, user_permission }) => {
  

    return [
        <Route
            key="home"
            path="/"
            exact
            render={() => 
            <Home />
            }
        /> 
    ];
};

Routes.propTypes = {
    store: PropTypes.object.isRequired,
    user_permission: PropTypes.object.isRequired,
};

export default Routes;