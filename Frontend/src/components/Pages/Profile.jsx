import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import PostCard from "../PostCard";
import axios from "axios";
import Post from "./Post";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const _id = localStorage.getItem("userId");
  console.log(_id);

  const fecthById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/auth/${_id}`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthById();
  }, []);

  console.log(posts);

  return (
    <Container>
      <Typography variant="h5">Your Posts</Typography>
      <Post/>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Profile;
