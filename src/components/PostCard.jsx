import axios from "axios";
import React, { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${_id}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = response.data.post;
      setPosts(posts.map((post) => (post._id === _id ? updatedPost : post)));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async () => {
    await commentPost(post._id, { comment });
    setComment("");
  };
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((like) => (
        <div
          style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}
          key={like._id}
        >
          <h3>{post.username}</h3>
          <p>{post.description}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
