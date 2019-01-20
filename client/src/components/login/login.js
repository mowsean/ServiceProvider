import React, { Component } from "react";
import "./login.css";
import { Link } from "react-router-dom";
class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="py-4 text-center">
          <h2>Get IN!</h2>
        </div>

        <form className="form-signin">
          <div className="text-center mb-4">
            {/*<h1 className="h3 mb-3 font-weight-normal">AppointEntity</h1> */}
            <p>
              Get into the worlds most leading and fastest growing community
              right away!!!
            </p>
          </div>

          <div className="form-label-group">
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
            {/* <label htmlFor="inputEmail">Email address</label> */}
          </div>

          <div className="form-label-group">
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
            />
            {/* <label htmlFor="inputPassword">Password</label> */}
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <Link to="/signup" className="btn btn-lg btn-success btn-block">
            Need account?
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
