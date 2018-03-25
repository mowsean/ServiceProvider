import React, {Component} from 'react';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import Jumbotron from '../components/jumbotron.jsx';
import Album from '../components/Album.jsx';
import Services from '../components/Services.jsx';
import ServiceResult from '../components/serviceResult.jsx';
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