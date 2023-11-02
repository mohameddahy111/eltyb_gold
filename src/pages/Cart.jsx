import React, { useState } from "react";
import { Store } from "../context/dataStore";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Cart = () => {
  const navigate = useNavigate()
  const {enqueueSnackbar , closeSnackbar }=useSnackbar()
  const { cart, cartItems, userToken  , getCart,loading, setLoading} = Store();
  const totlaItems = cartItems.reduce((a, c) => a + c.quantity, 0);
  const removeItem = async (id) => {
 setLoading(true)
    await axios.patch(
      "https://eltaybbackend.onrender.com/cart",
      { itemId: id },
     
    ).then((res)=>{
      if (res.status===200) {

        enqueueSnackbar(`${res.data.message}` ,{variant:'success'})
        getCart()
        setLoading(false)

      }
    }).catch((err)=>{
      setLoading(false)
      enqueueSnackbar(`${err.response.data}`, { variant: "error" });
    })
  };
  console.log(cartItems , cart)
  return (
    <Box py={4} >
    {!userToken && (<Box height={"70vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}><Typography  fontWeight={700} variant="h3">login in first to can add items </Typography> </Box>)}
    {cartItems.length ===0 && (<Box height={"70vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}><Typography  fontWeight={700} variant="h3">Add some item to your cart please </Typography> </Box>)}
    {cart && cartItems.length!==0 && (<>
        {loading ? <Loader/> :(

      <Container>
        <Typography p={5} textAlign={"center"} fontWeight={700} variant="h3">
          Cart Items
        </Typography>
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}  >
            <Card>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell> Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((x, index) => (
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
                        {x.price !== x.final_price ? (
                          <Typography><span className="price_span">{x.price}  </span> {x.final_price} LE </Typography>

                        ) :(
                          <Typography>{x.final_price} LE </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography>{x.size} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{x.quantity} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          <Button
                            color="error"
                            variant="contained"
                            startIcon={<Delete />}
                            onClick={() => removeItem(x._id)}
                            >
                            Remove{" "}
                          </Button>{" "}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                  </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card >
              <Container>
                <Typography
                  p={2}
                  variant="h5"
                  fontWeight={700}
                  textAlign={"center"}
                  textTransform={"capitalize"}
                  color={"#f0c000"}
                  >
                  Check out
                </Typography>
                <List>
                  <ListItem>
                    <Grid item xs={12}>
                      Total &nbsp; (item)s
                    </Grid>
                    <Grid textAlign={"end"} item xs={12}>
                      ({totlaItems}) items
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      Total &nbsp; price
                    </Grid>
                    <Grid textAlign={"end"} item xs={12}>
                      {cart.TAD} &nbsp; LE
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button onClick={()=>{navigate('/checkout')}} color="secondary" fullWidth variant="contained">
                      Chack Out
                    </Button>
                  </ListItem>
                </List>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Container>
        )}
    </>)}

    </Box>
  );
};

export default Cart;
