import React from "react";
import styles from "../css/loginCard.module.css";
import { Store } from "../context/dataStore";
import { Formik } from "formik";

import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const ValidtionRegister = () => {
  const {setOpenLoginDailog}=Store()
  const {enqueueSnackbar}=useSnackbar()
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Sign In</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          cPassword: "",
          phone: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Invalid password";
          } else if (values.password.length < 6) {
            errors.password = "password must be at least 6 characters";
          }
          if (!values.name) {
            errors.name = "Name is Required";
          } else {
            if (values.name.length < 2) {
              errors.name = "Name must be at least 2 characters";
            }
          }
          if (!values.cPassword) {
            errors.cPassword = " Confirm Password is Required";
          } else if (values.cPassword.length < 6) {
            errors.cPassword = "Confirm Password must be at least 6 characters";
          } else {
            if (values.password !== values.cPassword) {
              errors.cPassword = "password not match";
            }
          }
          if (!values.phone) {
            errors.phone = "Phone is Required";
          } else {
            // if(!/^01/.test(values.phone)){
            //   errors.phone = 'Phone must start 01'
            // }
          }
          return errors;
        }}
        onSubmit={async (values) => {
          await axios
            .post("https://eltaybbackend.onrender.com/users/", values)
            .then((res) => {
             if (res.status ===201) {
              enqueueSnackbar(`${res.data.message}` , {variant:'success'})
              setOpenLoginDailog(true)
             };
            })
            .catch((err) => {
              enqueueSnackbar(`${err.response.data}` , {variant:'error'})
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              required=""
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <span className={styles.errors}>
              {errors.name && touched.name && errors.name}
            </span>
            <input
              required=""
              className={styles.input}
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span className={styles.errors}>
              {errors.email && touched.email && errors.email}
            </span>
            <input
              required=""
              className={styles.input}
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            <span className={styles.errors}>
              {errors.phone && touched.phone && errors.phone}
            </span>
            <input
              required=""
              className={styles.input}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <span className={styles.errors}>
              {errors.password && touched.password && errors.password}
            </span>
            <input
              required=""
              className={styles.input}
              type="password"
              name="cPassword"
              id="cPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cPassword}
            />
            <span className={styles.errors}>
              {errors.cPassword && touched.cPassword && errors.cPassword}
            </span>
            <input
              className={styles.loginButton}
              type="submit"
              value="Register"
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ValidtionRegister;
