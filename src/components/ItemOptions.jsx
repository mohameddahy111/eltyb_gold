import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Store } from "../context/dataStore";

const ItemOptions = ({ data }) => {
  const { addItemToCart, setOpenDilago, setSeleProduct } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [size, setSize] = useState("");
  const [quatitiy, setQuatitiy] = useState(1);
  const item = {
    productId: data._id,
    size,
    quantity: quatitiy,
  };
  const agreeOrder = () => {
    addItemToCart(item);
    setTimeout(() => {
      setOpenDilago(false);
      setQuatitiy(1);
      setSize("");
    }, 100);
  };
  const cancelOrder = () => {
    setOpenDilago(false);
    setSeleProduct("");
    setTimeout(() => {
      setQuatitiy(1);
      setSize("");
    }, 100);
  };

  const increment = (opp) => {
    opp === "add"
      ? setQuatitiy(+quatitiy + 1)
      : quatitiy <= 1
      ? enqueueSnackbar("min Quatity is 1 ", { variant: "error" })
      : setQuatitiy(+quatitiy - 1);
  };
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={3}
        gap={2}
      >
        <FormControl>
          <InputLabel id="size">Size </InputLabel>
          <Select
            labelId="size"
            label="size"
            value={size || 0}
            onChange={(e) => setSize(e.target.value)}
            defaultValue={"samll"}
          >
            <MenuItem selected value={0}>
              select size{" "}
            </MenuItem>
            {data?.price_size?.map((x, index) => (
              <MenuItem value={x.size} key={index}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>{x.size} </Typography>{" "}
                  {x.offer_value >0 &&  <Typography color={'green'}>{x.offer_value} % off </Typography>}
                 
                </Box>{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <IconButton
            onClick={() => {
              increment("add");
            }}
          >
            <Add />{" "}
          </IconButton>
          <TextField
            value={+quatitiy}
            onChange={(e) => setQuatitiy(e.target.value)}
            inputProps={{ type: "number" }}
            sx={{ width: "80px", textAlign: "center" }}
            label={"quatitiy"}
            size="small"
            required={true}
          />
          <IconButton
            onClick={() => {
              closeSnackbar();
              increment("remov");
            }}
          >
            <Remove />{" "}
          </IconButton>
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={cancelOrder}>Disagree</Button>
        <Button onClick={agreeOrder}>Agree</Button>
      </DialogActions>
    </Box>
  );
};

export default ItemOptions;
