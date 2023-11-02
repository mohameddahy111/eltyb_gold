import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid , Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export default function DetailsOrderDetails({option , data}) {

  const handleClickOpen = () => {
    option.set(true);
  };

  const handleClose = () => {
    option.set(false);
  };

  return (
    <div>
      <Dialog
        open={option.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
      Order No :  {data._id}
        </DialogTitle>
        <DialogContent>
        <Grid item md={12} xs={12}>
                <Typography
                  fontWeight={700}
                  py={5}
                  variant="h5"
                  color={"#f0c000"}
                >
                  Order Informiton
                </Typography>

                <Card>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>size</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.cartItems?.map((x, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography
                                fontWeight={700}
                                color={"#208080"}
                                textTransform={"capitalize"}
                              >
                                {x.productId.title}{" "}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{x.price} LE </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{x.size} </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{x.quantity} </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
