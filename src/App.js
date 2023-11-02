import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import "./App.css";
import { Store } from "./context/dataStore";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/router";

function App() {
  return (
    <RouterProvider router={Router}></RouterProvider>
  );
}

export default App;
