import React, { Component } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="bd-footer text-muted">
                <div className="container-fluid p-3 p-md-5">
                    <ul className="bd-footer-links">
                        <li><Link to="/">Facebook</Link></li>
                        <li><Link to="/">Twitter</Link></li>
                        <li><Link to="/">Pin Intreset</Link></li>
                        <li><Link to="">About</Link></li>
                    </ul>
                    <p>Built with all the love in the world by <Link to="/" target="_blank" rel="noopener">@mow</Link>. Maintained by the <Link to="/">core team</Link> with the help of <Link to="/">our contributors</Link>.</p>
                    <p>Currently v4.0.0. Code licensed <Link to="/" target="_blank" rel="license noopener">MIT</Link>, docs <Link to="/" target="_blank" rel="license noopener">CC BY 3.0</Link>.</p>
                </div>
            </footer>
        );
    };
}

export default Footer;