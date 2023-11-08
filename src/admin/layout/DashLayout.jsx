import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Link, Outlet, useNavigation } from "react-router-dom";
import HeaderList from "../../layout/components/HeaderList";
import LoginCard from "../../components/LoginCard";
import { Store } from "../../context/dataStore";
import MenuAdmin from "../components/MenuAdmin";
import { Menu } from "@mui/icons-material";
import ChatDailog from "../../components/ChatDailog";

const DashLayout = () => {
  const { getAllOrders, mobileDivice } = Store();
  const [mobilList, setMobilList] = useState(false);
  const navigate = useNavigation();

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
    getAllOrders();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {window.location.pathname !== "/" && (
        <AppBar elevation={0} position="static" color="primary">
          <Toolbar sx={{ py: "20px" }}>
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
                {mobileDivice ? (
                  <IconButton onClick={() => setMobilList(!mobilList)}>
                    <Menu sx={{color:"#fff"}}  />{" "}
                  </IconButton>
                ) : (
                  <MenuAdmin />
                )}
              </Box>
            </Container>
          </Toolbar>
          <Box  sx={{transition :'all 0.4s'}} display={mobilList ? "block" : "none"}>
            <MenuAdmin />
          </Box>
        </AppBar>
      )}
      <main>
        <Outlet />
        <LoginCard />
      </main>
      <footer>
        <ChatDailog/>
        <Box>
          <Container>
            {/* <img src={footerImg} alt="" width={"10%"} /> */}
          </Container>
        </Box>
      </footer>
    </ThemeProvider>
  );
};

export default DashLayout;
