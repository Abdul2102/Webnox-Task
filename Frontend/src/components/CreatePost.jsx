import { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import axios from "axios";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/posts/", content, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
    }
  };

  return (
    <Paper
      sx={{ padding: 2, marginBottom: 2 }}
      className="w-full max-w-4xl mx-auto mt-4 shadow-md"
    >
      <TextField
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ marginTop: 1 }}
        className="bg-blue-600 text-white"
      >
        Post
      </Button>
    </Paper>
  );
};

export default CreatePost;
