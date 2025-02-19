const Post = require("../models/Post");

const createPost = async (req, res) => {
  console.log("come");
  
  try {
    const { title, file} = req;
    let data = {...title };
    console.log(data);
    
    if (file) {
      data = {
        ...data,
        filePath: file.destination,
        fileOriginalName: file.originalname,
        fileName: file.filename,
        fileType: file.mimetype,
      };
    }
   let createPost = await Post.create(data);
   res.json({
    createPost,
    message: "Post created Successfully.."
   })
  } catch (error) {
    res.status(500).json({ message: "Error while creating post" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.parama.id);
    post.likes += 1;
    await post.save();
    res.status(200).json({ post, message: "Post liked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking post", error: error.message });
  }
};

const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({
      username: req.user.username,
      comment: req.body.comment,
    });
    await post.save();
    res.status(200).json({ post, message: "Comment added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error commenting post", error: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
}

module.exports = {
  createPost,
  getAllPost,
  likePost,
  commentPost,
  getPostById
};
