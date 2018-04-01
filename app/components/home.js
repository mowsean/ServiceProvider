import React, {Component} from 'react';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
import Jumbotron from '../components/jumbotron.js';
import Album from '../components/Album.js';
import Services from '../components/Services.js';
import ServiceResult from '../components/serviceResult.js';
class Home extends Component {
    render() {
        return(
            <div>
                <Jumbotron title="Welcome" subtitle="This is sub title" />
                <Services>
                    <ServiceResult reusable={true} />
                </Services>
            </div>
        );
    }
}

 




export default Home;