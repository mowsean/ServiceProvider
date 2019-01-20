import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import "./app.css";
import debounce from "lodash.debounce";
import Routes from "../../Routes";

import GlobalLoading from "../../components/common/GlobalLoading";
import GlobalBlockingMessage from "../GlobalBlockingMessage";

import { getUser, getUserIsFetching } from "../../reducers/rootReducer";
import Navbar from "../../components/navbar";

import ManageHome from "../../components/home";
import ServiceResult from "../../components/serviceResult";
import Login from "../../components/login";
import Signup from "../../components/signup";
import PartnerAccount from "../../components/partnerAccount";
import Schedule from "../../components/schedule";
import ServiceProvider from "../../components/ServiceProvider";
import Footer from "../../components/Footer";
import {
  getCategoryIsFetching,
  getCategories
} from "../../reducers/rootReducer";
import { fetchCategories } from "../../actions/category";

/**
 * @Class App
 * @param {route[]} props.routes - Routes to build router and render menus
 * @param {Boolean} props.isFetchingCategories - Are we currently fetching the User object?
 * @param {Object} props.user - User object
 * @param {Function} props.fetchCategories - Thunk. Fetches User data.
 * @description
 * The application
 * @return {object} - jsx
 */
class App extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      isInitializing: true
    };
  }

  componentDidMount() {
    // set initial window resized event (for components that need window size)
    // this.props.windowResized(window.innerWidth);
    this.initialize();
    // set resize event listener (for components that need window size)
    //  window.addEventListener(
    //      'resize',
    //      debounce(() => this.props.windowResized(window.innerWidth), 500),
    //      false
    //  );
  }

  initialize() {
    this.setState(prevState => ({ isInitializing: false }));
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route key="home" exact path="/" component={ManageHome} />
          <Route
            key="/smartservices"
            path="/smartservices"
            component={ServiceResult}
          />
          <Route key="login" path="/login" component={Login} />
          <Route key="signup" path="/signup" component={Signup} />
          <Route
            key="partneraccount"
            path="/partneraccount"
            component={PartnerAccount}
          />
          <Route key="takeit" path="/takeit" component={ServiceProvider} />
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isFetchingCategories: getCategoryIsFetching(state),
  categories: getCategories(state)
});

App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  fetchCategories: PropTypes.func.isRequired,
  isFetchingCategories: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);
