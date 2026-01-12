import React from "react";
import { audience } from "../../../../../assets";
import './KnowAudience.scss'

const KnowAudience = () => {
    return (
        <div className="section know-your-audience">
            <header>
                <div>
                    <h2>Know your audience</h2>
                    <p>Find out which posts are a hit with Post’s built-in analytics. You’ll see where your audience is coming from and what they’re interested in. You can even connect your blog directly to Google Analytics for a more detailed look.</p>
                </div>
            </header>
            <div className="background">
                <div className="upper-bg">
                    <img src={audience[0]} alt="Audience 1" className="audience-img audience-1" />
                    <img src={audience[1]} alt="Audience 2" className="audience-img audience-2"/>
                </div>
                <div className="lower-bg">
                    <img src={audience[2]} alt="Audience 3" className="audience-img audience-3"/>
                    <img src={audience[3]} alt="Audience 4" className="audience-img audience-4"/>
                </div>
            </div>
        </div>
    )
}

export default KnowAudience;
