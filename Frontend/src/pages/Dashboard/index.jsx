import React, { useEffect, useState, useRef, useCallback } from "react";
import Header from "./Components/Header/Header";
import PostBackground from "./Components/PostBackground/PostBackground";
import Posts from "./Components/Posts/Posts";
import Loader from "../../ReusableComponents/Loader/Loader";
import PostModal from "./Components/PostModal/PostModal";
import { getRequest } from "../../apiRoutes"; // Import the universal GET helper
import "./style.scss";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [mode, setMode] = useState("all");

    const observer = useRef();

    const getUser = async () => {
        const data = await getRequest("http://127.0.0.1:5555/fetchUser", true);
        if (data.ok) setUser(data.data);
    };

    // fetch all posts
    const fetchAllPosts = async (currentPage = 1) => {
        setLoading(true);
        const data = await getRequest(
            `http://127.0.0.1:5555/fetchAllPosts?page=${currentPage}&limit=12`
        );
        if (data.ok) {
            setPosts((prev) => (currentPage === 1 ? data.data : [...prev, ...data.data]));
            setHasMore(data.hasMore);
        }
        setLoading(false);
    };

    // fetch my Posts
    const fetchMyPosts = async (currentPage = 1) => {
        setLoading(true);
        const data = await getRequest(
            `http://127.0.0.1:5555/fetchMyPosts?page=${currentPage}&limit=12`,
            true
        );
        if (data.ok) {
            setBlogs((prev) => (currentPage === 1 ? data.data : [...prev, ...data.data]));
            setHasMore(data.hasMore);
        }
        setLoading(false);
    };

    // Infinite Scroll Observer
    const lastBlogRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // First load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) getUser();
        fetchAllPosts(1);
    }, []);

    // When page changes (infinite scroll)
    useEffect(() => {
        if (page === 1) return;
        if (mode === "all") fetchAllPosts(page);
        else if (user) fetchMyPosts(page);
    }, [page, user]);

    // Switch to All Posts
    const handleAllPosts = () => {
        setMode("all");
        setPage(1);
        fetchAllPosts(1);
    };

    // Switch to My Posts
    const handleMyPosts = () => {
        if (!user) {
            alert("Please log in first");
            return;
        }
        setMode("mine");
        setPosts([]); // clear previous posts
        setPage(1);
        fetchMyPosts(1);
    };

    return (
        <div className="dashboard-container">
            <Header
                user={user}
                fetchAllPosts={handleAllPosts}
                fetchMyPosts={handleMyPosts}
                mode={mode}
            />

            <BlogBackground />

            <div className="blogs">
                <Posts
                    posts={posts}
                    user={user}
                    onBlogClick={(post) => setSelectedPost(post)}
                    lastPostRef={lastPostRef}
                />
                {loading && <Loader />}
            </div>

            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    currentUser={user}
                    onClose={() => setSelectedPost(null)}
                    onUpdate={() =>
                        mode === "all" ? fetchAllPosts(1) : fetchMyPosts(1)
                    }
                    onDelete={() =>
                        mode === "all" ? fetchAllPosts(1) : fetchMyPosts(1)
                    }
                />
            )}
        </div>
    );
};

export default Dashboard;
