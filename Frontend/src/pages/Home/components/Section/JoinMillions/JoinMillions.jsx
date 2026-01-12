import React from "react";
import './JoinMillions.scss'
import { useNavigate } from "react-router";

const JoinMillions = () => {
    const navigate = useNavigate();

    return (
        <div className="section millions">
            <header className="millions-header">
                <h2>Join millions of others</h2>
                <p>Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Post. Sign up to discover why millions of people have published their passions here.</p>
                <button onClick={() => navigate('/login')}>CREATE YOUR POST</button>
            </header>
            <div className="millions-background"></div>
        </div>
    )
}

export default JoinMillions;
