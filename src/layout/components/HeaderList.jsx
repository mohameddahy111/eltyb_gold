import {
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/styles.module.css";
import {
  Groups2,
  Home,
  LocalOffer,
  Login,
  ShoppingCart,
  Storefront,
} from "@mui/icons-material";
import { Store } from "../../context/dataStore";
import UserMenu from "./UserMenu";

const HeaderList = () => {
  const navigate = useNavigate();
  const { userInfo, cartItems, setOpenLoginDailog } = Store();

  const list = [
    { title: "Home", path: "/", icon: <Home sx={{ color: "#fff" }} /> },
    {
      title: "Shop",
      path: "/shop",
      icon: <Storefront sx={{ color: "#fff" }} />,
    },
    {
      title: "Cart",
      path: "/cart",
      icon: <ShoppingCart sx={{ color: "#fff" }} />,
    },
    {
      title: "Offer",
      path: "/offer",
      icon: <LocalOffer sx={{ color: "#fff" }} />,
    },
    {
      title: "About",
      path: "/about",
      icon: <Groups2 sx={{ color: "#fff" }} />,
    },
    { title: "Login", path: "/login", icon: <Login sx={{ color: "#fff" }} /> },
  ];
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {list.map((ele, index) => (
        <Box key={index}>
          {window.location.pathname !== ele.path && (
            <Tooltip
              key={index}
              title={
                ele.title === "Login" && userInfo
                  ? `${userInfo?.name}'s profile `
                  : ele.title
              }
            >
              {ele.title === "Cart" ? (
                <Badge
                  badgeContent={cartItems.length}
                  color="secondary"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="rectangular"
                >
                  <IconButton
                    onClick={() => navigate(`${ele.path}`)}
                    className="hvr-float-shadow"
                  >
                    {ele.icon}
                  </IconButton>
                </Badge>
              ) : ele.title === "Login" && userInfo ? (
                <Box className="hvr-float-shadow">
                  <UserMenu />{" "}
                </Box>
              ) : (
                <IconButton
                  onClick={
                    ele.title === "Login"
                      ? () => setOpenLoginDailog(true)
                      : () => navigate(`${ele.path}`)
                  }
                  className="hvr-float-shadow"
                >
                  {ele.icon}
                </IconButton>
              )}
            </Tooltip>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default HeaderList;
