import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../../context/dataStore";
import {
  Box,
  Button,
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
  TextField,
  Typography,
} from "@mui/material";
import Loader from "../../components/Loader";
import { useSnackbar } from "notistack";
import styles from "../css/orderTable.module.css";
import DetailsOrder from "../components/DetailsOrder";

const UserDetils = () => {
  const { userToken } = Store();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [details, setDetails] = useState("");


  const getuserDetils = async () => {
    await axios
      .get(`https://eltaybbackend.onrender.com/users/admin/user/${params.id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          closeSnackbar();
          // console.log(res);
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          setUser(res.data.user_info);
          setOrders(res.data.user_orders);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });
      });
  };
  useEffect(() => {
    getuserDetils();
  }, []);

  const showDetails = (ele) => {
    setDetails(ele);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };


  const totalSpend = orders
    .reduce((a, c) => parseFloat(a + c.totlaPrice), 0)
    .toFixed(2);
  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Container>
            <Typography
              align="center"
              variant="h3"
              textTransform={"capitalize"}
              fontWeight={700}
              p={10}
              color={"#f0c000"}
            >
              {user.name} Informtion
            </Typography>
            <Grid container spacing={1}>
              <Grid xs={12} md={3} item>
                <img
                  src="https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg"
                  alt="user"
                  width={"100%"}
                />
              </Grid>
              <Grid xs={12} md={9} item>
                <List
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Name"
                      value={user.name}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Phone"
                      value={user.phone}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Email"
                      value={user.email}
                    />
                  </ListItem>
                </List>
                <List
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Sign up "
                      value={new Date(user.createdAt).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField variant="filled" label="id" value={user._id} />
                  </ListItem>
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Verification"
                      value={user._isVerify === true ? "Yse" : "No"}
                    />
                  </ListItem>
                </List>
                <List
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Orders Numbers"
                      value={orders.length}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Spend"
                      value={`${totalSpend} LE`}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      variant="filled"
                      label="Verification"
                      value={user._isVerify === true ? "Yse" : "No"}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Box>
              <Container sx={{ py: "20px" }}>
                <Typography
                  align="center"
                  variant="h3"
                  textTransform={"capitalize"}
                  fontWeight={700}
                  p={10}
                  color={"#f0c000"}
                >
                  {user.name} Orders
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            Order ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            client name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            time & date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            order status
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            payment status
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            amount payment
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            textTransform={"capitalize"}
                            fontWeight={700}
                            variant="h6"
                          >
                            ditels
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders?.map((x, index) => (
                        <TableRow
                          key={x._id}
                          className={!x._isAccept ? `${styles.row}` : ""}
                        >
                          <TableCell>{x._id} </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} color={"#f0c000"}>
                              {x.userId.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {new Date(x.createdAt).toLocaleString()}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={
                                x.order_state === "prepar"
                                  ? styles.prepar
                                  : styles.ready
                              }
                            >
                              {x.order_state}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              className={
                                x.pay_state === false
                                  ? styles.notPay
                                  : styles.pay
                              }
                            >
                              {x.pay_state === false
                                ? "not payment"
                                : "payment"}{" "}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={600} color={"red"}>
                              {x.totlaPrice}&nbsp; LE
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                showDetails(x);
                              }}
                              variant="contained"
                            >
                              ditels
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"} 
                width={'100%'}
                
                p={5}
              >
                <Tooltip title="Last Page">
                  <IconButton
                    onClick={() => {
                      getAllOrders(pagination.pages);
                    }}
                  >
                    <SkipPrevious />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Next">
                  <IconButton
                    onClick={() => {
                      getAllOrders(pagination.nextPage);
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
                      getAllOrders(pagination.perPage);
                    }}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Tooltip>
                <Tooltip title="First Page">
                  <IconButton
                    onClick={() => {
                      getAllOrders(1);
                    }}
                  >
                    <SkipNext />
                  </IconButton>
                </Tooltip>
              </Box> */}
                  <DetailsOrder option={{ open: open, set: setOpen }} data={details} />
                </TableContainer>
              </Container>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default UserDetils;
