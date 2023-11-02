import { Box, Container, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../css/home.module.css";
import SwiperBtns from "../components/SwiperBnts";
import OredrDialog from "../components/OredrDialog";
import { UseGetAllproducts } from "../hooks/apiHoks";
import MinCard   from "../components/MinCard";
import Loader from "../components/Loader";
import { ArrowBackIos, ArrowForwardIos, SkipNext, SkipPrevious } from "@mui/icons-material";

const Shop = () => {
  const { products, loading  ,pagination ,setpage} = UseGetAllproducts();
  return (

    <Box pt={5} pb={2}>
        <SwiperBtns />
      {loading && <Loader/>}
        <Container>
          <Grid container spacing={1} pt={10}>
            {products.map((ele, index) => (
              <Grid item key={index} md={3} xs={12} my={2} >
                <MinCard ele={ele} />
              </Grid>
            ))}
                      <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            p={5}
          >
            <Tooltip title="Last Page">
              <IconButton
              onClick={() => {
                setpage(pagination.pages);
              }}
              >
                <SkipPrevious />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next">
              <IconButton
              onClick={() => {
                setpage(pagination.nextPage);
              }}
              >
                <ArrowBackIos />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography>
                {pagination.page} / {pagination.pages}
              </Typography>
            </Box>
            <Tooltip title="Previous">
              <IconButton
              onClick={() => {
                setpage(pagination.perPage);
              }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Tooltip>
            <Tooltip title="First Page">
              <IconButton
              onClick={() => {
                setpage(1);
              }}
              >
                <SkipNext />
              </IconButton>
            </Tooltip>
          </Box>

          </Grid>
          <OredrDialog />
        </Container>
    </Box>
  );
};

export default Shop;
