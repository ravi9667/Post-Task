import React, { useEffect, useState } from "react";
import postLogo from "../../../../assets/peercoin.png";
import { useNavigate } from "react-router";
import "./Header.scss";

const Header = () => {
    const navigate = useNavigate();
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY < 60); // top pe minimal header
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isTop ? "top" : "scrolled"}`}>
            <div className="header__logo">
                <img src={postLogo} alt="logo" />
                <p>Post</p>
            </div>

            <div className="header__actions">
                {isTop ? (
                    <span className="login-text" onClick={() => navigate('/login')}>SIGN IN</span>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => navigate('/login')}>Sign in</button>
                        <button className="create-btn" onClick={() => navigate('/login')}>Create your post</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
