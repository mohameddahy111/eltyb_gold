import React, { useEffect } from "react";
import { Store } from "../context/dataStore";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ProdectRouter = ({ children }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = Store();

  useEffect(() => {
    if (!userInfo) {
      closeSnackbar();
      navigate("/");
      enqueueSnackbar("must by login first", { variant: "error" });
      return;
    } else if (userInfo._isAdmin !== "admin") {
      closeSnackbar();
      navigate("/");
      return;
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default ProdectRouter;
