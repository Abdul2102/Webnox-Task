import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    setIsAuthenticated(!!token);
    setUserId(storedUserId);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserId(null);
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <header>
      <AppBar position="static" className="bg-white shadow-md">
        <Toolbar className="flex justify-between items-center w-full mx-auto px-4">
          <div className="flex justify-between items-center space-x-2">
            <Link to={"/"} className="text-gray-800 text-2xl font-extrabold">
              BondSpace
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6 text-gray-600">
            <NavLink
              to={"/"}
              className="text-gray-800 font-bold text-lg hover:border-b-2"
            >
              Home
            </NavLink>
            <NavLink
              to={"/form"}
              className="text-gray-800 font-bold text-lg hover:border-b-2"
            >
              Create Post
            </NavLink>
            {isAuthenticated && userId && (
              <NavLink
                to={`/profile/${userId}`}
                className="text-gray-800 font-bold text-lg hover:border-b-2"
              >
                My Post
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleProfileMenu}>
                </IconButton>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button
                    variant="outlined"
                    className="border-gray-300 text-gray-700"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    variant="contained"
                    className="bg-blue-600 text-white"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <IconButton
            edge="end"
            className="md:hidden"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List className="w-60">
          <ListItem button onClick={handleDrawerToggle}>
            <NavLink to={"/form"} className="w-full text-center">
              Create Post
            </NavLink>
          </ListItem>

          {isAuthenticated && userId && (
            <ListItem button onClick={handleDrawerToggle}>
              <NavLink to={`/profile/${userId}`} className="w-full text-center">
                My Post
              </NavLink>
            </ListItem>
          )}

          {isAuthenticated ? (
            <>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-blue-600 text-white"
                >
                  <Link to={`/profile/${userId}`}>Profile</Link>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleLogout}
                  className="border-gray-300 text-gray-700"
                >
                  Logout
                </Button>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  className="border-gray-300 text-gray-700"
                >
                  <Link to={"/login"}>Log in</Link>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-blue-600 text-white"
                >
                  <Link to={"/register"}>Sign up</Link>
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </header>
  );
};

export default Navbar;
