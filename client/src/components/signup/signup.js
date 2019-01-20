import React, { Component } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    return (
      <div className="">
        <div className="container col-md-6">
          <div className="py-4 text-center">
            <h2>Join Us!</h2> <p>We are the best in the game...</p>
          </div>
          <hr className="mb-4" />
          <form className="needs-validation" noValidate="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  required=""
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required=""
                />
                <div className="invalid-feedback" style={{ width: "100%" }}>
                  Your Email is required.
                </div>
              </div>
            </div>

            <hr className="mb-4" />
            <div className="py-4 text-center">
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Get Registered!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
