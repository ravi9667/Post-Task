import React from "react";
import "./Profile.scss";

const Profile = ({ user, onClose }) => {

    const toTitleCase = (str) => {
        return str
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        onClose();
        alert("Logged out successfully!");
        window.location.href = "/";
    };

    return (
        <div className="profile-menu">
            <div className="profile-info">
                <p className="name">{user ? toTitleCase(user.name): "user"}</p>
                <p className="email">{user ? user.email : "user@example.com"}</p>
            </div>

            <hr />

            <button className="menu-item">All Posts</button>
            <button className="menu-item">My Posts</button>
            <button className="menu-item">Bookmarks</button>
            <button className="menu-item">Settings</button>

            <hr />

            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
