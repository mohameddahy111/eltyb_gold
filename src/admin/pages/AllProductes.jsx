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
  Switch,
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseGetAllproducts } from "../../hooks/apiHoks";
import { Store } from "../../context/dataStore";
import AddCategoryBrands from "../components/AddCategoryBrands";
import axios from "axios";

const AllProductes = () => {
  const navigate = useNavigate();
  const { CategoryBrands, setCategoryBrands } = Store();
  const { products  , pagination ,setpage } = UseGetAllproducts();
  const [addItem , setAddItem]=useState('')

  const add = (titel)=>{
    setAddItem(titel)
    setTimeout(()=>{
      setCategoryBrands(true)
    },100)

  }
  return (
    <Box>
      <Box
        p={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/dashboard/products/add_product`)}
        >
          Add proudect
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => add(e.target.innerText)}
        >
          Add category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => add(e.target.innerText)}
        >
          Add brand
        </Button>
      </Box>
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
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    statue
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
                    quantity
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    item_sell
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    stock
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
              {products?.map((x, index) => (
                <TableRow key={x._id}>
                  <TableCell>
                    {" "}
                    <Typography variant="h6" color={"#f0c000"}>
                      {x.title}{" "}
                    </Typography>{" "}
                  </TableCell>
                  <TableCell>
                    <Switch checked={x.statue} />
                  </TableCell>
                  <TableCell>
                    {new Date(x.createdAt).toLocaleString()}{" "}
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{x.quantity}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography> {x.item_sell} </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} color={"red"}>
                      {x.stock}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      // onClick={() => {
                      //   showDetails(x);
                      // }}
                      variant="contained"
                    >
                      eidit
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
              <IconButton
              onClick={() => {
                setpage(pagination.pages);
              }}
              >
                <SkipPrevious />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next">
              <IconButton
              onClick={() => {
                setpage(pagination.nextPage);
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
                setpage(pagination.perPage);
              }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Tooltip>
            <Tooltip title="First Page">
              <IconButton
              onClick={() => {
                setpage(1);
              }}
              >
                <SkipNext />
              </IconButton>
            </Tooltip>
          </Box>
          {/* <DetailsOrder option={{ open: open, set: setOpen }} data={details} /> */}
        </TableContainer>
      </Container>
      <AddCategoryBrands title={addItem} />
    </Box>
  );
};

export default AllProductes;
