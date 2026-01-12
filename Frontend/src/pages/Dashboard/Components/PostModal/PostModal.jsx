import React, { useState } from "react";
import { patchData, deleteData } from "../../../../apiRoutes";
import './PostModal.scss';

const PostModal = ({ post, onClose, onDelete, onUpdate, currentUser }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.topic);
    const [editContent, setEditContent] = useState(post.post);

    const createdDate = new Date(post.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Update post
    const handleUpdate = async () => {
        const data = await patchData("http://127.0.0.1:5555/updatePost", {
            _id: post._id,
            topic: editTitle,
            post: editContent
        });

        if (data.ok) {
            alert("post Updated Successfully");
            onUpdate();
            setIsEditing(false);
            onClose();
        } else {
            alert(data.message);
        }
    };

    // Delete post
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this Post?")) return;

        const data = await deleteData("http://127.0.0.1:5555/deletePost", {
            postId: post._id
        });

        if (data.ok) {
            alert("Post Deleted Successfully");
            onDelete();
            onClose();
        } else {
            alert(data.message);
        }
    };

    const isAuthor = post.userId?._id.toString() === currentUser?._id.toString();

    return (
        <div className="blog-modal-overlay">
            <div className="blog-modal">
                <button className="close-btn" onClick={onClose}>✕</button>
                {post.img && (
                    <img
                        className="modal-img"
                        src={`http://127.0.0.1:5555/uploads/${post.img}`}
                        alt="post"
                    />
                )}
                {isEditing ? (
                    <>
                        <input
                            className="edit-title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            className="edit-content"
                            rows="8"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        ></textarea>
                        <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
                        <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h1>{blog.topic}</h1>
                        <p className="blog-text">{post.blog}</p>

                        <div className="author-box">
                            <h4>Author — {post.userId?.name || 'Unknown'}</h4>
                            <p>Created — {createdDate}</p>
                        </div>
                    </>
                )}
                {isAuthor && !isEditing && (
                    <div className="actions">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Post</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete Post</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostModal;
