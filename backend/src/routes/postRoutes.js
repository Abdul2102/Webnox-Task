const express = require("express");
const {verifyToken} = require("../middleware/authToken");
const singleUpload = require("../middleware/multer");
const {
  createPost,
  getAllPost,
  likePost,
  commentPost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/", verifyToken, singleUpload).post(createPost);
router.get("/", getAllPost);
router.post("/:id/like", verifyToken, likePost);
router.post("/:id/comment", verifyToken, commentPost);

module.exports = router;
