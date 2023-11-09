import { Box, Card, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import dilevery from "../../img/dilevery.png";
import { MonetizationOnOutlined, ShowChartOutlined } from "@mui/icons-material";
import {
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "../css/minCard.module.css";
import { Store } from "../../context/dataStore";
const DlieveryCom = () => {
  const { mobileDivice } = Store();
  const data = [
    { cheft: 1, start: 20, midel: 40, end: 120 },
    { cheft: 2, start: 10, midel: 44, end: 110 },
    { cheft: 3, start: 115, midel: 30, end: 30 },
  ];

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card sx={{ p: "10px" }}>
        <Typography
          color={'rgb(146, 108, 42)'}
          textTransform={"capitalize"}
          fontWeight={700}
          variant="h6"
        >
          Dlievery
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={4} sm={6} xs={12} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <img src={dilevery} alt="dilevery" width={"100%"} />
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <List>
              <ListItem>
                <Grid item xs={12}>
                  Total Orders:
                </Grid>
                <Grid item xs={12} display={"flex"} alignItems={"center"}>
                  <Typography> 30</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={12}>
                  Total price :
                </Grid>
                <Grid item xs={12} display={"flex"} alignItems={"center"}>
                  <Typography> 4000 EL </Typography>
                </Grid>
              </ListItem>

            </List>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default DlieveryCom;
