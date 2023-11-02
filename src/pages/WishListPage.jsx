import React, { useEffect, useState } from "react";
import { Store } from "../context/dataStore";
import MinCard from "../components/MinCard";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import OredrDialog from "../components/OredrDialog";

const WishListPage = () => {
  const { wishList, getWishList, userToken } = Store();
  const filter = async () => {
    wishList.map(async (x) => {
      if (x.productId === null) {
        await axios
          .patch(
            `https://eltaybbackend.onrender.com/wishlist/`,
            { id: x._id },
            { headers: { Authorization: `Bearer ${userToken}` } }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            getWishList();
          });
      }
    });
  };

  useEffect(() => {
    getWishList();
    filter();
  }, []);
  return (
    <Box pt={5} pb={2}>
      {wishList?.length === 0  || !wishList ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"60vh"}
        >
          <Typography
            textAlign={"center"}
            textTransform={"capitalize"}
            fontWeight={700}
            variant="h4"
          >
            {" "}
            Add some item to your List{" "}
          </Typography>
        </Box>
      ) : (
        <Container>
          <Grid container spacing={1} pt={10}>
            {wishList?.map((ele, index) => (
              <Grid item key={index} md={3} xs={12}>
                <MinCard ele={ele.productId} />
              </Grid>
            ))}
          </Grid>
          <OredrDialog />
        </Container>
      )}
    </Box>
  );
};

export default WishListPage;
