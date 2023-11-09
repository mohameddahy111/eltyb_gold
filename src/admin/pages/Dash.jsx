import React, { useEffect } from "react";
import { Store } from "../../context/dataStore";
import { Box, Container, Grid } from "@mui/material";
import MinCards from "../components/MinCards";
import styles from "../css/minCard.module.css";
import DlieveryCom from "../components/DlieveryCom";

const Dash = () => {
  const {} = Store();

  return (
    <Box className={styles.container}>
      <Box>
        <Container>
          <Grid container spacing={1}>
            <DlieveryCom/>
            <MinCards />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dash;
