import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Feed from "./components/Pages/Feed";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Post from "./components/Pages/Post";
import Profile from "./components/Pages/Profile";
import PostForm from "./components/PostForm";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/form" element={<PostForm />} />
      </Routes>
    </>
  );
};
export default App;
