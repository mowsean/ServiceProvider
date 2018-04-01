import React, { Component } from 'react';
import './scheduleappointment.css';
import { Link } from 'react-router-dom';
class ScheduleAppointment extends Component {
    render() {
        return (
            <div className="row col-md-12 mb-4 margin-0">
                <div className="col-md-8 mb-4">
                    <h3 className="mb-3">
                        Color
                    </h3>
                    <div className="list-group col-md-12 mb-4">
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Cras justo odio
                            <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Dapibus ac facilisis in  <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Morbi leo risus <span className="badge badge-default badge-pill">$11.00 | 15 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Porta ac consectetur ac <span className="badge badge-default badge-pill">$14.00 | 45 mins</span> 
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action  justify-content-between">
                            Vestibulum at eros<span className="badge badge-default badge-pill">$30.00 | 60 mins</span> 
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                    </div>

                    <h3 className="mb-3">
                        Hair Cutting
                    </h3>
                    <div className="list-group col-md-12 mb-4">
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                           Cras justo odio 
                            <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Dapibus ac facilisis in  <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Morbi leo risus <span className="badge badge-default badge-pill">$11.00 | 15 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Porta ac consectetur ac <span className="badge badge-default badge-pill">$14.00 | 45 mins</span> <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small></Link>
                        <Link to="/" className="list-group-item list-group-item-action  justify-content-between">
                            Vestibulum at eros<span className="badge badge-default badge-pill">$30.00 | 60 mins</span> <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                    </div>
                    <h3 className="mb-3">
                       Fire & Ice Flash Facial
                    </h3>
                    <div className="list-group col-md-12 mb-4">
                        <Link to="/" className="list-group-item list-group-item-action justify-content-between">
                            Cras justo odio
                            <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                            <small>
                                <button className="btn btn-success w-100">Schedule</button>
                            </small>
                        </Link>
                       
                    </div>
                </div>
                <div className="col-md-4 order-md-2 mt-5">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                      
                        <div className="w-100 mt-3">
                            
                            <div className="col-md-12 mb-4">
                                {/* <small>No service added yet!</small> */}
                                {/* <button className="btn btn-warning w-100 disabled">No service added</button> */}
                                <small>Select an other or  </small>
                                <button className="btn btn-warning w-100">Choose DateTime</button>
                            </div>
                            <hr />

                            <div className="list-group col-md-12 mb-4">
                                <div className="list-group-item list-group-item-action justify-content-between">
                                    Hair Cut
                                    <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                                    <small>
                                        <Link to="/" className="btn btn-failure w-100">
                                            <h5 className="mb-3">
                                                <span class="fa fa-trash" aria-hidden="true"></span>
                                            </h5>
                                        </Link>
                                    </small>
                                </div>
                                <div className="list-group-item list-group-item-action justify-content-between">
                                    Hair Color
                                    <span className="badge badge-default badge-pill">$14.00 | 30 mins</span>
                                    <small>
                                        <Link to="/" className="btn btn-failure w-100">
                                            <h5 className="mb-3">
                                                <span class="fa fa-trash" aria-hidden="true"></span>
                                            </h5>
                                        </Link>
                                    </small>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleAppointment;