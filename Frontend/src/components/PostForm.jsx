// import { useState } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";
// import axios from "axios";

// const PostForm = ({}) => {
//   const [content, setContent] = useState({
//     title: "",
//     image: "",
//   });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   console.log(token);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("description", content);
//     if (image) formData.append("image", image);

//     try {
//       await axios.post("http://localhost:5000/posts/", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setContent("");
//       setImage(null);
//       setPreview(null);
//     } catch (error) {
//       console.error("Error creating post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="max-w-lg mx-auto my-4 p-4 shadow-lg">
//       <CardContent>
//         <Typography variant="h6" className="mb-2">
//           Create a Post
//         </Typography>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <TextField
//             label="What's on your mind?"
//             name="description"
//             fullWidth
//             multiline
//             rows={3}
//             value={content.title}
//             onChange={(e) => setContent(e.target.value)}
//           />

//           <div className="flex items-center space-x-2">
//             <IconButton color="primary" component="label">
//               <PhotoCamera />
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 value={content.image}
//               />
//             </IconButton>
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="h-16 w-16 rounded-lg"
//               />
//             )}
//           </div>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? "Posting..." : "Post"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default PostForm;

import axios from "axios";
import React, { useState } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/posts/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setTitle("");
      setFile("");
    } catch (error) {
      setMessage("Error while creating post");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Create a post
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="filename"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            {" "}
            Create Post
          </button>
        </form>
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default PostForm;
