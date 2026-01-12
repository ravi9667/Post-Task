import React from "react";
import postLogo from '../../../../assets/peercoin.png'
import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={postLogo} alt="Post Logo" />
                    <p>Post</p>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>About</h4>
                        <p>Learn more about Posts and how you can share your passions with the world.</p>
                    </div>

                    <div>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Templates</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Connect</h4>
                        <ul className="social-links">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Post — All Rights Reserved.</p>
                <p>Made with ❤️ using React</p>
            </div>
        </div>
    )
}

export default Footer;
