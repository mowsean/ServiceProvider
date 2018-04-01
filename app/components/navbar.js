import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse padding-nav">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/">
                    <img className="d-block" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="45" height="45" />

                </Link>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active  padding-5">
                            <Link className="btn line-height-1 success my-sm-0" to="/help">Help?</Link>
                        </li>

                        {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li> */}

                        {/* <li className="nav-item  padding-5">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            </li> */}

                        <li className="nav-item padding-5">
                            <Link className="btn line-height-1 btn-outline-success my-sm-0" to="/login">Login</Link> &nbsp;
                        </li><li className="nav-item padding-5">
                            <Link className="btn line-height-1 btn-outline-warning my-sm-0" to="/PartnershipAccount">Need Partnership?</Link>
                        </li>
                        <li className="nav-item"></li>
                    </ul>
                    {/* <form className="form-inline mt-2 mt-md-0 ">
                        <Link className="btn btn-outline-success my-2 my-sm-0" to="/help">Help?</Link>
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">Login</Link>
                        </form> */}
                </div>
            </nav>
        );
    }
}

export default Navbar;