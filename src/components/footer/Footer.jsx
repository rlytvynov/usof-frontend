import React from "react";
import './footer.css'
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer>
            <div className="footer-info">
                <div className="footer-logo">
                    <h3 className="Logo"><Link className="logo" to="/">USOF</Link></h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda laborum voluptate explicabo reprehenderit maxime impedit aliquam
                    </p>
                </div>
                <div className="footer-nav">
                    <Link className="footer-link" to="/">Main</Link>
                    <Link className="footer-link" to="/account">Account</Link>
                    <Link className="footer-link" to="/posts">Questions</Link>
                    <Link className="footer-link" to="/about-us">About Us</Link>
                </div>
            </div>
            <div className="footer-copyright">© 2022 USOF. All rigths reserved</div>
		</footer>
	);
}

export default Footer;