import React from "react";
import { red, green, blue } from "../../../../../assets";
import './Hero.scss'
import { useNavigate } from "react-router";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="section hero">
            <header className="hero-header">
                <h2>Publish your passions, your way</h2>
                <p>Create a unique and beautiful Post easily.</p>
                <button onClick={() => navigate('/login')}>CREATE YOUR POST</button>
            </header>
            <div className="hero-background">
                <div className="theme red">
                    {red.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`red theme ${index + 1}`}
                            className={`red-img red-${index + 1}`}
                        />
                    ))}
                </div>
                <div className="theme green">
                    {green.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`green theme ${index + 1}`}
                            className={`green-img green-${index + 1}`}
                        />
                    ))}
                </div>
                <div className="theme blue">
                    {blue.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`blue theme ${index + 1}`}
                            className={`blue-img blue-${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero;
