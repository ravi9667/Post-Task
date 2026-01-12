import React, { useState } from "react";
import './AddPost.scss';

const AddPost = ({ onClose, onPostAdded }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("img", image);
        formData.append("topic", title);
        formData.append("blog", content);

        try {
            const response = await fetch("http://127.0.0.1:5555/addPost", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            });

            const data = await response.json();
            console.log("Add Post Res:", data);

            if (data.ok) {
                alert("Post Added Successfully");
                onPostAdded();
                onClose();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error adding Post:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="add-blog-overlay">
            <div className="add-blog-modal">
                <h2>Add New Post</h2>

                <form onSubmit={handleSubmit}>
                    <label>Post Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    <label>Post Heading:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Post title"
                        required
                    />

                    <label>Post Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your Post..."
                        rows="6"
                        required
                    ></textarea>

                    <div className="buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit" className="submit-btn">
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
