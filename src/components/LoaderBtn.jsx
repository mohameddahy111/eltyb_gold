import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Store } from "../context/dataStore";
import { useSnackbar } from "notistack";

const Loder = () => {
  return (
    <>
      <Triangle
        height="20px"
        width="20px"
        color="#"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};
const LoaderBtn = ({x, getUsers, val}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { userToken } = Store();
  const setBlock = async () => {
    setBtnLoading(true);
    await axios
      .patch(
        `https://eltaybbackend.onrender.com/users/setting`,
        { id: x._id, _isBlocked: val },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          setBtnLoading(false);
          getUsers();
        }
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
      });
  };

  return (
    <Button
      startIcon={btnLoading ? <Loder /> : ""}
      onClick={() => {
        setBlock();
      }}
      variant={"contained"}
      color={x._isBlocked ?  "error" :"primary"}
      disabled={btnLoading}
    >
      {!x._isBlocked ? "Block" : "unblocked"}
    </Button>
  );
};
export default LoaderBtn;
