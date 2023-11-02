import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Store } from "../../context/dataStore";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function AddCategoryBrands({ title }) {
  const {
    CategoryBrands,
    setCategoryBrands,
    userToken,
    categoryList,
    getAllCategories,
  } = Store();
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const brand = title === "ADD CATEGORY" ? false : true;

  const formData = new FormData();

  const validationSchema = yup.object({
    title: yup.string().min(2).required(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: "",
      url,
      img,
    },
    onSubmit: async (values) => {
      Object.keys(values).map((x, index) => {
        return formData.append(x, values[x]);
      });

      if (!brand) {
        await axios
          .post(`https://eltaybbackend.onrender.com/categories/`, formData, {
            headers: { Authorization: `Bearer ${userToken}` },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(
            `https://eltaybbackend.onrender.com/categories/${category}/brands`,
            formData,
            { headers: { Authorization: `Bearer ${userToken}` } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const handleClose = () => {
    setCategoryBrands(false);
  };

  useEffect(() => {
    formik.values.img = img[0];
    formik.values.url = url;
  }, [img, url]);

  useEffect(() => {
    getAllCategories();
  }, [brand]);
  return (
    <React.Fragment>
      <Dialog
        open={CategoryBrands}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h5" fontWeight={700} p={3}>
            {` ${title}`}
          </Typography>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Box
                  my={2}
                  width={"100%"}
                  height={"400px"}
                  sx={{
                    backgroundImage: `url(${
                      img
                        ? URL.createObjectURL(img[0])
                        : formik.values.url || ""
                    })`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    boxShadow: "0px 0px 10px gray",
                    borderRadius: "20px",
                  }}
                ></Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <TextField
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                      label="Title"
                      fullWidth
                    />
                  </ListItem>
                  {brand && (
                    <ListItem>
                      <Box width={"100%"}>
                        <FormControl fullWidth>
                          <InputLabel id="category">category</InputLabel>
                          <Select
                            fullWidth
                            labelId="category"
                            id="category"
                            value={category}
                            label="category"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categoryList?.map((x) => (
                              <MenuItem key={x._id} value={x._id}>
                                {x.title}{" "}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>{" "}
                    </ListItem>
                  )}
                  <ListItem>
                    <TextField
                      type="file"
                      fullWidth
                      onChange={(e) => setImg(e.target.files, setUrl(""))}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      name="url"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value, setImg(""));
                      }}
                      label="url"
                      fullWidth
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button type="submit" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
