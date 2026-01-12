// postController.js
import { postData } from "../Models/postDatas.js";
import mongoose from "mongoose";

// Fetch all post (public)
export const fetchAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const posts = await postData
            .find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await postData.countDocuments();

        res.send({
            ok: true,
            data: posts,
            total,
            hasMore: page * limit < total,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to fetch posts" });
    }
};

// Fetch post of logged-in user
export const fetchMyposts = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        // Convert string _id from JWT to ObjectId
        const userId = new mongoose.Types.ObjectId(req.user._id);
        console.log(typeof userId, userId)

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        console.log(page, limit, skip);

        const posts = await postData
            .find({ userId: userId })
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log("posts fetched for user:", posts);

        const total = await postData.countDocuments({ userId });

        res.send({
            ok: true,
            data: posts,
            total,
            hasMore: page * limit < total,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to fetch user posts" });
    }
};

// Add new post
export const addpost = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({ ok: false, message: "Unauthorized" });
        }

        const { topic, post } = req.body;
        const img = req.file ? req.file.filename : null;

        const newPost = await postData.create({
            topic,
            post,
            img,
            userId: new mongoose.Types.ObjectId(req.user._id), // ensure ObjectId type
        });

        res.send({
            ok: true,
            message: "post Added Successfully",
            data: newPost,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Failed to add post" });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.body;

        const deleted = await postData.deleteOne({
            _id: postId,
            userId: new mongoose.Types.ObjectId(req.user._id),
        });

        if (!deleted.deletedCount)
            return res.send({ ok: false, message: "post not found or unauthorized" });

        res.send({ ok: true, message: "post deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Delete failed" });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const { topic, post, _id } = req.body;

        const updated = await postData.findOneAndUpdate(
            { _id, userId: new mongoose.Types.ObjectId(req.user._id) },
            { $set: { topic, post } },
            { new: true }
        );

        if (!updated)
            return res.send({ ok: false, message: "Not authorized or post not found" });

        res.send({ ok: true, message: "post updated", data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).send({ ok: false, message: "Update failed" });
    }
};
