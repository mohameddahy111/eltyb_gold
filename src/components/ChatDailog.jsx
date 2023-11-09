import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Store } from "../context/dataStore";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import styles from "../css/chat.module.css";
import { Send } from "@mui/icons-material";
import { socket } from "../socket";

export default function ChatDailog() {
  const { openChat, setOpenChat, userInfo  } = Store();
  const [ListMessage, setLestMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [sender, setSender] = useState("");

  const send = () => {
    socket.connect();
    socket.emit("sendMessage", { send: sendMessage, id: userInfo._id });
    setSendMessage("");
    socket.on("addMessage", (data) => {
      setLestMessage(data?.sendMessage);
      setSender(data?.userIdSend);
    });
    // socket.disconnect();
  };
  const handleClose = () => {
    socket.disconnect();
    setOpenChat(false);
  };

  useEffect(() => {
    socket.connect();
    if (userInfo) {
      socket.emit("openChat", { id: userInfo._id });
      socket.on("getChat", (data) => {
        if (data) {
          setLestMessage(data?.sendMessage);
          setSender(data?.userIdSend);
        }
      });
      
    }
  }, [openChat]);

  return (
    <React.Fragment>
      <Dialog
        open={openChat}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"customers service Chat"}
        </DialogTitle>
        <Container>
          <Grid container spacing={1}>
            {ListMessage?.map((mess, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={9}
                className={styles.chat}
                my={2}
              >
                <Typography
                  color={sender?._isAdmin === "user" ? "skyblue" : "darkred"}
                  variant="h6"
                  align={sender?._isAdmin === "user" ? "right" : "left"}
                  px={2}
                >
                  {sender?._isAdmin === "user" ? sender?.name : "customer"}
                </Typography>
                <Typography align="left" px={2}>
                  {mess.send}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={1}
            py={3}
          >
            <TextField
              fullWidth
              placeholder="Type your message .... "
              size="small"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
            <Button
              onClick={send}
              endIcon={<Send />}
              variant="contained"
              color="secondary"
            >
              send
            </Button>
          </Box>
        </Container>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
