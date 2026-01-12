import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { upload } from "../Middleware/upload.js";
import {
    fetchAllPosts,
    fetchMyPosts,
    addPost,
    deletePost,
    updatePost
} from "../Controllers/blogController.js";

const router = express.Router();

router.get("/fetchAllPosts", fetchAllPosts);
router.get("/fetchMyPosts", verifyToken, fetchMyPosts);
router.post("/addPost", verifyToken, upload.single("img"), addPost);
router.delete("/deletePost", verifyToken, deletePost);
router.patch("/updatePost", verifyToken, updatePost);

export default router;
