import React, {Component} from 'react';
import './jumbotron.css';
import { Icon, Input } from 'semantic-ui-react';

class Jumbotron extends Component {
     render () {
        return (
                <section className="hero">
                <div className="container" style={{ width: '65%' }}>
                    <img style={{ width: '80px', height: '80px' }} src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png" srcSet="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png 1x, https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack@2x.png 2x"/>
                        <h1 className="display-1 text-bold">Appoint anything</h1>
                        <h5 className="text-gray-soft text-regular">Done it! Go get it!!!</h5>
                        <form className="card p-2">
                            <div className="input-group">
                            
                             <div className="input-group-append">
                                <button type="submit" className="btn line-height-1 btn-secondary">Appoint</button>
                                </div>
                                <input type="text" className="form-control text-right" placeholder="Appoint" />
                                <input type="text" className="form-control" placeholder="Location"/>
                                    <div className="input-group-append">
                                <button type="submit" className="btn line-height-1 btn-secondary">Location</button>
                                    </div> 
                                </div>
                            </form>
                    </div>
                </section>
            );
     }

}

export default Jumbotron;