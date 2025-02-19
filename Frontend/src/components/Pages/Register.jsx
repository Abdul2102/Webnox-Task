import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/api";
import axios from "axios";
import { toast } from "react-toastify";

const urlApi = "http://localhost:5000/auth";

const Register = () => {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formdata,
        [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    try {
        const response = await axios.post(`${urlApi}/register`,{
            username: formdata.username,
            email: formdata.email,
            password: formdata.password,
        });
        toast.success(response.data.message);
        navigate("/login");
    } catch (error) {
        setError(error.response?.data?.message || "Failed to register.");
    }
    
  };
  return (
    <div className="w-[100%] max-[780px]:w-full max-[440px]:p-7 flex justify-center">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          -- Welcome to BondSpace --
        </Typography>

        <div className="w-full max-w-md p-6 rounded-xl shadow-sm shadow-slate-600 bg-white flex flex-col items-center justify-center">
        {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  variant="outlined"
                  value={formdata.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formdata.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={formdata.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ padding: "12px" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography variant="body1" align="center" my={2}>
            OR
          </Typography>

          {/* Google Login */}

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1E3A8A" }}>
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Register;
