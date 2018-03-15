import React, { Component } from 'react';
import './appointment.css';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class Appointment extends Component {

    render () {
        return(
            <div className="mb-5">
                <div className="col-sm-12 mb-5">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <img className="img-services-in card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1620495daca%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1620495daca%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                        <div className="card-body d-flex flex-column align-items-start">
                            <h3 className="mb-0">
                                Travel Inc Ltd
                                </h3>
                            <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                            <div className="btn-group">
                                <Link to="/service/appointment" className="btn btn-sm btn-outline-secondary">Take!</Link>
                                <Link to="/" className="btn btn-sm btn-outline-secondary">Peek</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 mb-5">
                    <Tabs>
                        <TabList>
                            <Tab>Title 1</Tab>
                            <Tab>Title 2</Tab>
                            <Tab>Title 3</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Any content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </Tabs>
                </div>
                    {/* <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link active" to="#home">home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#profile">profile</Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">.1..</div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">..2.</div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">.3..</div>
                    </div> */}
              
            </div>
        );
    }
}

export default Appointment;