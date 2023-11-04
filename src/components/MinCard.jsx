import React, { useEffect, useState } from "react";
import styles from "../css/minCard.module.css";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import { Store } from "../context/dataStore";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useSnackbar } from "notistack";

const MinCard = ({ ele }) => {
  const [wish, setWish] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setOpenDilago, setSeleProduct, userToken, wishList, getWishList } =
    Store();
  const showDialog = () => {
    setSeleProduct(ele);
    setTimeout(() => {
      setOpenDilago(true);
    }, 100);
  };
  const addWishList = async () => {
    if (!userToken) {
      enqueueSnackbar("Must Log in First to add to Wish list", {
        variant: "warning",
      });
      return;
    }

    await axios
      .post(
        `https://eltaybbackend.onrender.com/wishlist/`,
        { productId: ele._id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        setWish(!wish);
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, { variant: "error" });
      })
      .finally(() => {
        getWishList();
      });
  };
  const findWishList = wishList?.find((x) => x.productId?._id === ele?._id);

  useEffect(() => {
    if (findWishList) {
      setWish(true);
    }
    // add(wish);
  }, [wishList]);
  return (
    <>
      {ele && (
        <div className={styles.book} >
          <Box pt={1}>
            <Checkbox
              onChange={addWishList}
              checked={wish}
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                zIndex: 1,
              }}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              icon={<FavoriteBorder />}
            />


            <List>
              <ListItem>
                <Typography
                  fontWeight={600}
                  color={"#fff"}
                  width={"100%"}
                  textAlign="center"
                  fontSize={25}
                >
                  {ele.title}{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontWeight={600}>
                  Size :
                  <Typography component={"span"} fontWeight={400}>
                    {" "}
                    S , M , L, 1 Letre , 1.5 Leter{" "}
                  </Typography>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontWeight={600}>
                  Category :{" "}
                  <Typography component={"span"} fontWeight={400}>
                    {" "}
                    {ele.category.title}{" "}
                  </Typography>{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontWeight={600}>
                  {" "}
                  Desc :
                  <Typography component={"span"} fontWeight={400}>
                    {" "}
                    {ele.descrption.split(' ').splice(0, 4).join(' ')}
                  </Typography>{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography fontWeight={600}>
                  {" "}
                  rating :
                  <Rating
                    size="small"
                    sx={{ color: "#fff" }}
                    value={4.5}
                    readOnly
                    precision={0.5}
                  />{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => {
                    showDialog();
                  }}
                  variant="contained"
                  fullWidth
                  disabled={!ele.statue}
                >
                  {!ele.statue ? "not available " : "Add to cart"}
                 
                </Button>
              </ListItem>
            </List>
          </Box>
          <div
            className={styles.cover}
            style={{ backgroundImage: `url(${ele.img.scr})` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default MinCard;
