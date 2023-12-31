import React, { Fragment, useEffect } from "react";
import UserMenu from "../../layout/components/UserMenu";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import {
  AddBusiness,
  AutoAwesomeMotion,
  Dashboard,
  Groups2,
  Message,
  ReportProblem,
  VpnLock,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Store } from "../../context/dataStore";

const MenuAdmin = () => {
  const { allOrders,setOpenChat,adminChats   } = Store();
  const navigate = useNavigate();
  const notAccept  = allOrders?.filter(x=>x._isAccept === false)

  const list = [
    {
      title: "Dashborad",
      path: "/dashboard",
      icon: <Dashboard sx={{ color: "#fff" }} />,
    },
    {
      title: "Users",
      path: "/dashboard/all_user/",
      icon: <Groups2 sx={{ color: "#fff" }} />,
    },
    {
      title: "Orders",
      path: "/dashboard/all_orders",
      icon: <AutoAwesomeMotion sx={{ color: "#fff" }} />,
    },

    {
      title: "Products",
      path: "/dashboard/products",
      icon: <AddBusiness sx={{ color: "#fff" }} />,
    },
    {
      title: "Reports",
      path: "/dashboard/reports",
      icon: <ReportProblem sx={{ color: "#fff" }} />,
    },
    {
      title: "Chats",
      click: ()=>{setOpenChat(true)},
      icon: <Message sx={{ color: "#fff" }} />,
    },
  ];
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {list.map((x, index) => (
        <Fragment key={index}>
          {x.title === "Orders" ? (
            <Badge  color='error' anchorOrigin={{vertical:'top'  , horizontal:"left"}}  badgeContent = {notAccept.length }>
              <Tooltip title={x.title} >
                <IconButton onClick={() => navigate(`${x.path}`)}>
                  {x.icon}
                </IconButton>
              </Tooltip>
            </Badge>
          ):x.title === "Chats" ? (
            <Badge  color='error' anchorOrigin={{vertical:'top'  , horizontal:"left"}}  badgeContent = {adminChats.number_Unread }>
            <Tooltip title={x.title} >
              <IconButton onClick={ x.click}>
                {x.icon}
              </IconButton>
            </Tooltip>
          </Badge>

          ):(  <Tooltip title={x.title} key={index}>
            <IconButton onClick={() => navigate(`${x.path}`)}>
              {x.icon}
            </IconButton>
          </Tooltip>
        ) }
        </Fragment>
      ))}
      <UserMenu />
    </Box>
  );
};

export default MenuAdmin;


