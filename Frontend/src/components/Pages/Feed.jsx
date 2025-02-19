import React, { useEffect, useState } from "react";
import CreatePost from "../CreatePost";
import Post from "./Post";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fecthPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fecthPosts();
  }, []);
  return (
    <div>
      <CreatePost />
      <Post />
    </div>
  );
};

export default Feed;
