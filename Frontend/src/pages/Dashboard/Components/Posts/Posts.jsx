import React from "react";
import './Posts.scss';

const Posts = ({ posts, user, onPostClick, lastPostRef }) => {
    if (!posts || posts.length === 0) return <h2
        style={{
            marginTop: '100px',
            textAlign: 'center',
            color: '#3b3b3bff',
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            fontWeight: 600,
        }}
    >
        No Posts Found
    </h2>;

    return (
        <div className="blogs-list">
            {posts.map((post, index) => {
                const postCreatedTime = new Date(post.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });

                const isLast = posts.length === index + 1;

                return (
                    <div
                        key={post._id}
                        className="blog-container"
                        ref={isLast ? lastPostRef : null}
                        onClick={() => onBlogClick(post)}
                        style={{ cursor: 'pointer' }}
                    >
                        {post.img && (
                            <img
                                src={`http://127.0.0.1:5555/uploads/${post.img}`}
                                alt="post"
                            />
                        )}
                        <h1>{post.topic}</h1>
                        <p>{post.blog}</p>
                        <div>
                            <h4>{`Author - ${post.userId?.name ? post.userId.name : 'Unknown'}`}</h4>
                            <p>{`Created At - ${postCreatedTime}`}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
