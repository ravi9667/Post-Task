import React from "react";
import { memories } from "../../../../../assets";
import './Memories.scss'

const Memories = () => {
    return (
        <div className="section memories">
            <header>
                <div>
                    <h2>Hang onto your memories</h2>
                    <p>Save the moments that matter. Post lets you safely store thousands of posts, photos, and more with Google.</p>
                </div>
            </header>
            <div className="background">
                {memories.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`memories ${i + 1}`}
                        className={`memories-img memories-${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Memories;
