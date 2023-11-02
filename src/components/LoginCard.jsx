import React from "react";
import styles from "../css/loginCard.module.css";
import { Box, Dialog, Slide, Tab, Tabs, Typography } from "@mui/material";
import { Store } from "../context/dataStore";
import { Formik } from "formik";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import VildtionLogin from "./VildtionLogin";
import ValidtionRegister from "./ValidtionRegister";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LoginCard = () => {
  const { openLoginDailog, setOpenLoginDailog } = Store();

  const handleClose = () => {
    setOpenLoginDailog(false);
  };
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Dialog
        open={openLoginDailog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ width: "100%" }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Log in" {...a11yProps(0)} />
              <Tab label="Regester" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <VildtionLogin/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
         <ValidtionRegister/>
          </CustomTabPanel>
        </Box>{" "}
      </Dialog>
    </div>
  );
};

export default LoginCard;
