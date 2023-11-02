import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { Store } from "../context/dataStore";
import ItemOptions from "./ItemOptions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OredrDialog = () => {
  const { openDilago, setOpenDilago, seleproduct, setSeleProduct } = Store();

  const handleClose = () => {
    setOpenDilago(false);
    setSeleProduct("");
  };

  return (
    <div>
      <Dialog
        open={openDilago}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"select your item options"}</DialogTitle>
        <DialogContent>
            <ItemOptions data={seleproduct}  />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OredrDialog;
