import {
  ArrowBackIos,
  ArrowForwardIos,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../context/dataStore";
import Loader from "../../components/Loader";
import { useSnackbar } from "notistack";
import LoaderBtn from "../../components/LoaderBtn";

const AllUsers = () => {
  const navigate = useNavigate()
  const { userToken } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const getUsers = async () => {
    await axios
      .get(`https://eltaybbackend.onrender.com/users/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };
  const setBlock = async (val, id) => {
    setBtnLoading(true);
    await axios
      .patch(
        `https://eltaybbackend.onrender.com/users/setting`,
        { id: id, _isBlocked: val },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          setBtnLoading(false);
          getUsers();
        }
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ py: "20px" }}>
          <TextField
            label={"Search by Id"}
            inputProps={{ type: "text" }}
            // onChange={(e) => {
            //   setSearch(e.target.value);
            // }}
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
                      user name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textTransform={"capitalize"}
                      fontWeight={700}
                      variant="h6"
                    >
                      user email
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
                      Blocked
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textTransform={"capitalize"}
                      fontWeight={700}
                      variant="h6"
                    >
                      phone number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      textTransform={"capitalize"}
                      fontWeight={700}
                      variant="h6"
                    >
                      Active
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
                {users?.map((x, index) => (
                  <TableRow key={index}>
                    <TableCell>{x.name} </TableCell>
                    <TableCell>
                      <Link to={`/dashboard/all_user/`}>
                        <Typography fontWeight={600} color={"#f0c000"}>
                          {x.email}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(x.createdAt).toLocaleString()}{" "}
                    </TableCell>
                    <TableCell align="center">
                      <LoaderBtn x={x} val={!x._isBlocked} getUsers={getUsers}  />
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{x.phone} </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontWeight={600}
                        color={!x._isActive ? "red" : "green"}
                      >
                        {x._isActive ? "Active" : "Disabled"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate(`/dashboard/all_user/${x._id}`)
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
              width={"100%"}
              p={5}
            >
              <Tooltip title="Last Page">
                <IconButton onClick={() => {}}>
                  <SkipPrevious />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next">
                <IconButton onClick={() => {}}>
                  <ArrowBackIos />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography></Typography>
              </Box>
              <Tooltip title="Previous">
                <IconButton onClick={() => {}}>
                  <ArrowForwardIos />
                </IconButton>
              </Tooltip>
              <Tooltip title="First Page">
                <IconButton onClick={() => {}}>
                  <SkipNext />
                </IconButton>
              </Tooltip>
            </Box>
          </TableContainer>
        </Container>
      )}
    </Box>
  );
};

export default AllUsers;
