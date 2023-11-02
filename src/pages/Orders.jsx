import React, { useEffect, useState } from "react";
import { Store } from "../context/dataStore";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../components/Loader";
import DetailsOrderDetails from "../components/DetailsOrderDailog";

const Orders = () => {
  const { userInfo, userToken } = Store();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");

  console.log(orders);
  const getUserOrders = async () => {
    await axios
      .get("https://eltaybbackend.onrender.com/orders", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (!userInfo) {
      closeSnackbar();
      enqueueSnackbar("must by login first", { variant: "error" });
      navigate("/");
    } else {
      getUserOrders();
    }
  }, []);
  const showDetails = (ele) => {
    setDetails(ele);
    setTimeout(() => {
      setOpen(true)
    }, 100);
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: "20px" }}>
                    Order No:
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "20px" }}>
                    Time & Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "20px" }}>
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "20px" }}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((ele, index) => (
                  <TableRow key={index} >
                    <TableCell>{ele._id} </TableCell>
                    <TableCell>
                      {new Date(ele.createdAt).toLocaleString()}{" "}
                    </TableCell>
                    <TableCell> {ele.totlaPrice} &nbsp; LE </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          showDetails(ele);
                        }}
                        variant="contained"
                        color="secondary"
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DetailsOrderDetails
            option={{ open: open, set: setOpen }}
            data={details}
          />
        </Container>
      )}
    </Box>
  );
};

export default Orders;
