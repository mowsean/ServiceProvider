import React, { Component } from 'react';
import './appointment.css';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ScheduleAppointment from "./scheduleappointment.js";

class Appointment extends Component {
    render() {
        return (
            <div className="mb-5">
                <div className="col-sm-12 mb-5 padding-left-right-0">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <img className="img-services-in card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1620495daca%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1620495daca%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                        <div className="card-body d-flex flex-column align-items-start">
                            <h3 className="mb-0">
                                The Waxing Studio
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 mb-5 padding-left-right-0">
                    <Tabs>
                        <TabList>
                            <Tab>About Us</Tab>
                            <Tab>Services</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="row col-md-12 mb-2 margin-0">   
                                <div className="col-md-8">
                                    <div className="card flex-md-row mb-4 box-shadow h-md-250 bg-whitesmoke">
                                        <div className="card-body d-flex flex-column align-items-start">
                                            <h3 className="mb-3">
                                                About
                                            </h3>
                                            <p className="card-text">
                                                The Waxing Studio in the heart of Boston, MA is a waxing studio that offers premier waxing concepts so you can look and feel your best. We specialize in comprehensive body and facial waxing for both men and women. With more than 15 years of experience.
                                            </p>

                                            <h4 className="mb-3">
                                                Additional Info
                                            </h4>
                                            <p className="card-text">
                                                Located in the heart of Bostons Backbay. 114 Newbury st.
                                            </p>

                                        </div>
                                    </div>

                                    <div className="card flex-md-row mb-4 box-shadow h-md-250 bg-whitesmoke">
                                        <div className="card-body d-flex flex-column align-items-start">
                                            <h4 className="mb-0">
                                               114 Newbury st, 2nd Floor, Boston, MA 02116
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="card flex-md-row mb-4 box-shadow h-md-250 bg-whitesmoke">
                                        <div className="card-body d-flex flex-column align-items-start">
                                            <h3 className="mb-3">
                                                Staff
                                            </h3>
                                            <div className="card flex-md-row p-0">
                                                <img className="img-staff card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1620495daca%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1620495daca%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                                <div className="card-body d-flex flex-column align-items-start">
                                                    <h3 className="mb-0">
                                                         Jason Stohrer 
                                                    </h3>
                                                    <p className="card-text mb-auto">Hair Cutting Master</p>
                                                </div>
                                            </div>
                                            <div className="card flex-md-row p-0">
                                                <img className="img-staff card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1620495daca%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1620495daca%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                                <div className="card-body d-flex flex-column align-items-start">
                                                    <h3 className="mb-0">
                                                        Claire Gauthier
                                                    </h3>
                                                    <p className="card-text mb-auto">Hair Color Master</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 order-md-2 mb-4">
                                    <div className="card flex-md-row mb-4 box-shadow h-md-250 bg-whitesmoke">
                                        <div className="w-100 mt-3">
                                            <div className="col-md-12  mb-4">
                                                <button className="btn btn-warning w-100">Appoint yourself</button>
                                            </div>
                                            <hr />
                                            <div className="col-md-12 mb-5">
                                                <h5 className="mb-3">
                                                    <span class="fa fa-map-marker"></span> Address
                                                </h5>
                                                <p>114 Newbury st, 2nd Floor, Boston, MA 02116</p>
                                            </div>
                                            <div className="col-md-12 mb-5">
                                                <h5 className="mb-3">
                                                    <span class="fa fa-clock-o"></span> Hours
                                                </h5>
                                                <p>Tuesday–Friday, 10 a.m.–7 p.m. Saturday, 10 a.m.–4 p.m.</p>
                                            </div>
                                            <div className="col-md-12 mb-5">
                                                <h5 className="mb-3">
                                                    <span className="fa fa-credit-card"></span> Payment
                                                </h5>
                                                <p><span className="fa fa-cc-visa"></span> <span className="fa fa-cc-mastercard"></span> <span className="fa fa-cc-discover"></span> <span className="fa fa-money"></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <ScheduleAppointment userid="1"/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Appointment;