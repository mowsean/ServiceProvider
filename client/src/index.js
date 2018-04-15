import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import Navbar from "./components/navbar/navbar.js";
import Home from "./components/home/home.js";
import ServiceResult from "./components/serviceResult/serviceResult.js";
import Login from "./components/login/login.js";
import Signup from "./components/signup/signup.js";
import PartnerAccount from "./components/partnerAccount/partnerAccount.js";
import Schedule from "./components/schedule/schedule.js";
import ServiceProvider from "./components/ServiceProvider/ServiceProvider.js";
import Footer from "./components/Footer/footer.js";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
render(
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Route key="home" exact path="/" component={Home} />
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
  </Provider>,
  document.getElementById("app")
);
