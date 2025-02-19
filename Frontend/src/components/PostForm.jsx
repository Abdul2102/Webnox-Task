import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";

const PostForm = ({}) => {
  const [content, setContent] = useState({
    title: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("description", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/posts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto my-4 p-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="mb-2">
          Create a Post
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="What's on your mind?"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={content.title}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex items-center space-x-2">
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
                value={content.image}
              />
            </IconButton>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 rounded-lg"
              />
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
