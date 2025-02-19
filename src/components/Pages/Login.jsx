import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const urlApi = "http://localhost:5000/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${urlApi}/login`, { email, password });
      toast.success(res.data.Message);
      localStorage.clear();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.findEmail._id);
      navigate("/");
    } catch (error) {
      toast.error(error.res?.data?.Message || "Login failed");
    }
  };
  return (
    <div className="w-[100%] max-[780px]:w-full max-[440px]:p-7 flex justify-center">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          mb={3}
        >
          Welcome to BondSpace
        </Typography>

        <div className="w-full max-w-md p-6 rounded-xl shadow-sm shadow-slate-600 bg-white flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography variant="body1" align="center" mt={2} mb={2}>
            OR
          </Typography>

          <Typography variant="body2" align="center" mt={2}>
            <Link to="/forgotpassword" style={{ color: "#1E3A8A" }}>
              Forgot Password
            </Link>
          </Typography>
          <Typography variant="body2" align="center" mt={2}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#1E3A8A" }}>
              Register
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
