import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "../css/home.module.css";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import { Link, useNavigate } from "react-router-dom";
import { LocalOffer, Login,  Storefront } from "@mui/icons-material";
import { Store } from "../context/dataStore";
import UserMenu from "../layout/components/UserMenu";
import { serviesList } from "../utils/data";

const Home = () => {
  const {userInfo , setOpenLoginDailog}=Store()
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?._isAdmin === "admin") {
      navigate("/dashboard");
    }
  }, [userInfo]);

  return (
    <Box className={styles.container_Grid}>
      <AppBar
        position="static"
        sx={{ bgcolor:'transparent' , border: "none" }}
        elevation={0}
      >
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Link to="/" className="hvr-float-shadow">
                <Typography
                  color="primary"
                  fontWeight={700}
                  fontSize={30}
                  textTransform={"uppercase"}
                >
                  El_tayb
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Tooltip title="Shop">
                <IconButton onClick={()=>navigate('/shop')} className="hvr-float-shadow">
                  <Storefront />
                </IconButton>
              </Tooltip>
              <Tooltip title="offers">
                <IconButton className="hvr-float-shadow">
                  <LocalOffer />
                </IconButton>
              </Tooltip>
              <Tooltip  title={userInfo? `${userInfo?.name}'s profile` :'Login'}>
                {userInfo?(<Box className="hvr-float-shadow"><UserMenu/></Box> ) :(
                <IconButton className="hvr-float-shadow" onClick={()=>{setOpenLoginDailog(true)}}>
                  <Login />
                </IconButton>

                )}
              </Tooltip>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid
          item
          md={4}
          className={styles.grid3}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          xs={4}
        >
          <img src={img2} alt="" />
        </Grid>
        <Grid
          item
          md={4}
          className={styles.grid2}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          xs={4}
        >
          <List>
            {serviesList.map((ele, index) => (
              <ListItem key={index}>
                <button
                  onClick={() => {
                    navigate(`${ele.path}`);
                  }}
                  className={`${styles.listBtn} hvr-buzz-out`}
                >
                  {ele.title}
                </button>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          md={4}
          className={styles.grid1}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          xs={4}
        >
          <img src={img1} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
