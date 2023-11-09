import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { Store } from "../context/dataStore";
import HeaderList from "./components/HeaderList";
import styles from "../css/styles.module.css";
import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import footerImg from "../img/img4.png";
import LoginCard from "../components/LoginCard";
import HelpSpeed from "../components/HelpSpeed";
import ChatDailog from "../components/ChatDailog";

const Layout = () => {
  const {userInfo} =Store()
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: "Exo 2",
    },
    palette: {
      mode: "light",
      primary: {
        main: "#203040",
      },
      secondary: {
        main: "#f0c000",
      },
    },
  });

  useEffect(() => {
    if (userInfo?._isAdmin === "admin") {
      navigate("/dashboard");
    }
  }, [userInfo]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {window.location.pathname !== "/" && (
        <AppBar elevation={0} position="static" color="primary">
          <Toolbar className={styles.toolbar} sx={{ py: "20px" }}>
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
                    color="#fff"
                    fontWeight={700}
                    fontSize={30}
                    textTransform={"uppercase"}
                  >
                    El@tayb
                  </Typography>
                </Link>
              </Box>
              <Box>
                <HeaderList />
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      )}
      <main>
        <Outlet />
        <LoginCard />
      </main>
      <footer>
        <Box bgcolor={"#203040"}>
          <Container sx={{position :'relative'}}>
        <HelpSpeed/>
            <img src={footerImg} alt="" width={"10%"} />
          </Container>
        </Box>
      </footer>
      <ChatDailog/>
    </ThemeProvider>
  );
};

export default Layout;
