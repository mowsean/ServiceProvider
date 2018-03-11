import React, {Component} from 'react';
import './jumbotron.css';

class Jumbotron extends Component {
  

     render () {
     return (
        //  <section className="jumbotron">
        //      <div className="container">
        //          <h1 className="jumbotron-heading">{this.props.title}</h1>


        //          <p className="lead text-muted">{this.props.subtitle}</p>
        //          <p>
        //              <a href="#" className="btn btn-primary my-2">Main call to action</a>
        //              <a href="#" className="btn btn-secondary my-2">Secondary action</a>
        //          </p>
        //      </div>
        //  </section>
         <section className="hero">
             <div className="container"><img src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png" srcSet="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png 1x, https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack@2x.png 2x"/>
                 <h1 className="display-1 text-bold">Appoint anything</h1>
                 <h5 className="text-gray-soft text-regular">We are the worlds most leading and fasted growing community...</h5>
         
                 <form className="card p-2">
                 
                 
                     <div className="input-group">
                         <div className="input-group-append">
                             <button type="submit" className="btn btn-secondary">Appoint</button>
                         </div>
                         <input type="text" className="form-control text-right" placeholder="Appoint" />
                         <input type="text" className="form-control" placeholder="Location"/>
                             <div className="input-group-append">
                                 <button type="submit" className="btn btn-secondary">Location</button>
                             </div>
                        </div>
                    </form>
                 {/* <form className="hero__form" action="https://themes.getbootstrap.com/shop/">
                     <div className="form-group">
                         <div className="input-group">
                             <div className="input-group-prepend">
                                 <span className="input-group-text" id="">Search</span> 
                                
                                
                                 
                             </div>
                             <input type="text" className="form-control"/>
                             <div className="input-group-prepend">
                                 <span className="input-group-text" id="">Location</span>
                             </div>
                                 <input type="text" className="form-control"/>
                        </div>
                    </div>
                </form> */}
            </div>
        </section>
         );
     }

}

export default Jumbotron;