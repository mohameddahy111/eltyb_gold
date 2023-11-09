import { Box, Card, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import mony from "../../img/mony_Backgroun_Removed.png";
import { MonetizationOnOutlined } from "@mui/icons-material";
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
const MinCards = () => {
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
          color={"rgb(60, 158, 125)"}
          textTransform={"capitalize"}
          fontWeight={700}
          variant="h6"
        >
          Earnings
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={3} sm={6} xs={12}>
            <img src={mony} alt="mony" width={"100%"} />
          </Grid>
          <Grid item md={9} sm={6} xs={12}>
            <List>
              <ListItem>
                <Grid item xs={12}>
                  Earnings
                </Grid>
                <Grid item xs={12} display={"flex"} alignItems={"center"}>
                  <Typography>6000 El</Typography>
                  <MonetizationOnOutlined sx={{ color: "#3b9e7d" }} />
                </Grid>
              </ListItem>

              <ListItem></ListItem>
            </List>
          </Grid>
        </Grid>
        <Box>
          <LineChart
            width={ 300}
            height={150}
            data={data}
            className={styles.lien_chart}
          >
            <Line
              type="monotone"
              dataKey={"start"}
              stroke="#0396FF"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey={"midel"}
              stroke="#F6416C"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey={"end"}
              stroke="#0E197D"
              strokeWidth={3}
            />
            <Tooltip />
            <XAxis dataKey={"cheft"} />
            <YAxis />
            <Legend />
          </LineChart>
        </Box>
      </Card>
    </Grid>
  );
};

export default MinCards;
