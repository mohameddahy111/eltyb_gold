import { Container } from '@mui/material';
import React from 'react';
import { Triangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* <Grid container spacing={1} alignItems='center'>
        <Grid item xs={12}> */}
          <Triangle
            height='70vh'
            width='50vw'
            color='#f0c000'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
            
          />
        {/* </Grid>
      </Grid> */}
    </Container>
  );
}