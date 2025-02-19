import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";
import { BiSend } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdChatBubbleOutline, MdFavoriteBorder } from "react-icons/md";

const content = [
  {
    id: 1,
    username: "Abdul",
    title: "i create unique post",
    likes: 100,
    image:
      "https://img.freepik.com/free-psd/real-estate-house-social-media-post-square-banner-template_202595-444.jpg?t=st=1739943975~exp=1739947575~hmac=21c792fb9a58cc7f0d8eb126c16939915aead15833d0eda97b3110c718e0451f&w=740",
  },
  {
    id: 2,
    title: "i will created post",
    username: "Kumar",
    likes: "100k",
    image:
      "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-social-media-banner-instagram-post-template_106176-2302.jpg?ga=GA1.1.1895733828.1727070152&semt=ais_hybrid",
  },
];

const Post = () => {
  const [posts, setPosts] = useState([]);
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
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

  console.log(posts);

  return (
    <div className="flex flex-col items-center p-4">
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        content.map((post) => (
          <Card
            key={post.id}
            className="w-full max-w-lg rounded-lg shadow-md mb-6"
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <span className="ml-2 font-semibold">{post.username}</span>
              </div>
              <span className="text-gray-500 cursor-pointer">
                <BsThreeDots />
              </span>
            </div>
            <div className="relative">
              <img
                src={post.image} 
                alt="post"
                className="w-full object-cover"
              />
            </div>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4">
                  <MdFavoriteBorder className="cursor-pointer" />
                  <MdChatBubbleOutline className="cursor-pointer" />
                  <BiSend className="cursor-pointer" />
                </div>
              </div>
              <Button onClick={() => handleLike(post._id)}>
                {post.likes} ❤️
              </Button>
              <p className="text-sm">
                <span className="font-semibold">{post.title}</span>{" "}
                {post.caption}
              </p>
              <p className="text-xs text-gray-500 cursor-pointer">
                View all {post.comments?.length || 10} comments
              </p>
              <p className="text-xs text-gray-400 mt-1">6 days ago</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Post;
