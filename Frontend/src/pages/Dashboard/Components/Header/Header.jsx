import React, { useState } from "react";
import logo from '../../../../assets/peercoin.png';
import AddPost from "../Header/Components/AddPost/AddPost"
import Profile from "./Components/Profile/Profile"
import './Header.scss';

const Header = ({ user, mode, fetchAllPosts, fetchMyPosts }) => {
    const [showAddPost, setShowAddPost] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const getInitials = () => {
        if (!user || !user.name) return 'U';
        const parts = user.name.trim().split(" ");
        return parts[0][0].toUpperCase() + (parts[1]?.[0]?.toUpperCase() || "");
    };

    return (
        <>
            <div className="header-container">
                <div className="blogger">
                    <img src={logo} alt="logo" width={35} />
                    <p>Posts</p>
                </div>
                <div className="sections">
                    <button
                        className={`all-blogs ${mode === "all" ? "active" : ""}`}
                        onClick={fetchAllPosts}
                    >
                        All Posts
                    </button>
                    <button
                        className={`my-blogs ${mode === "mine" ? "active" : ""}`}
                        onClick={fetchMyPosts}
                    >
                        My Posts
                    </button>

                    <button className="add-blog" onClick={() => setShowAddBlog(true)}>+</button>

                    <div className="profile-wrapper">
                        <button className="profile" onClick={() => setShowProfile(!showProfile)}>
                            {getInitials()}
                        </button>
                        {showProfile && <Profile user={user} onClose={() => setShowProfile(false)} />}
                    </div>
                </div>
            </div>

            {showAddPost && <AddPost onClose={() => setShowAddPost(false)} onPostAdded={fetchAllPosts} />}
        </>
    );
};

export default Header;
