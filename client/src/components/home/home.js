import React, { Component } from 'react';
import Navbar from '../navbar/navbar.js';
// import Footer from '../components/footer.js';
import Jumbotron from '../jumbotron/jumbotron.js';
import ServiceThumbs from '../serviceThumbs/serviceThumbs.js';
import ServiceResult from '../serviceResult/serviceResult.js';
 
class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron title="Welcome" subtitle="This is sub title" />
                <ServiceThumbs>
                    <ServiceResult reusable={true} />
                </ServiceThumbs>
            </div>
        );
    }
}
export default Home;