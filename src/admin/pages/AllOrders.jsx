import React, { useEffect, useState } from "react";
import { Store } from "../../context/dataStore";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../css/orderTable.module.css";
import DetailsOrder from "../components/DetailsOrder";
import {
  ArrowBackIos,
  ArrowForwardIos,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";

const AllOrders = () => {
  const { getAllOrders, allOrders, pagination } = Store();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [search, setSearch] = useState("");
  const [list, setList] = useState(null);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  const searchItem = () => {
    const list = allOrders?.filter((x) => x.id === search);
    setList(list);
  };

  const showDetails = (ele) => {
    setDetails(ele);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  useEffect(() => {
    setInterval(()=>{
      getAllOrders();

    },120*100)
    getAllOrders();
  }, []);
  useEffect(() => {
    searchItem();
  }, [search]);
  return (
    <Box>
      <Container sx={{ py: "20px" }}>
        <TextField
          label={"Search by Id"}
          inputProps={{ type: "text" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
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
              {allOrders?.map((x, index) => (
                <TableRow
                  key={x._id}
                  className={!x._isAccept ? `${styles.row}` : ""}
                >
                  <TableCell>{x._id} </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/all_user/${x.userId._id}`}>
                      <Typography fontWeight={600} color={"#f0c000"}>
                        {x.userId.name}
                      </Typography>
                    </Link>
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
                        x.pay_state === false ? styles.notPay : styles.pay
                      }
                    >
                      {x.pay_state === false ? "not payment" : "payment"}{" "}
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
              <Box
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
              </Box>
          <DetailsOrder option={{ open: open, set: setOpen }} data={details} />
        </TableContainer>
      </Container>
    </Box>
  );
};

export default AllOrders;
