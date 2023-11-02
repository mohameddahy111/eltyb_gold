import React from "react";
import styles from "../css/loginCard.module.css";
import { Store } from "../context/dataStore";
import { Formik } from "formik";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";


const VildtionLogin = () => {
  const {enqueueSnackbar}=useSnackbar()
  const navigate = useNavigate()
  const {setOpenLoginDailog , setUserToken}=Store()


  return (
    <div className={styles.container}>
    <div className={styles.heading}>Sign In</div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            values.email
          )
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Invalid password";
        } else if (values.password.length < 6) {
          errors.password = "password must be at least 6 characters";
        }
        return errors;
      }}
      onSubmit={async(values) => {
        await axios
        .post("https://eltaybbackend.onrender.com/users/login", values)
        .then((res) => {
         if (res.status ===200) {
          setUserToken(res.data.token)
          localStorage.setItem('userToken',JSON.stringify(res.data.token))
          enqueueSnackbar(`${res.data.message}` , {variant:'success'})
          setOpenLoginDailog(false)
          
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
          <Link to="/">
            <span className={styles.forgotPassword}>
              Forgot Password ?
            </span>
          </Link>

          <input
            className={styles.loginButton}
            type="submit"
            value="Sign In"
          />
        </form>
      )}
    </Formik>
  </div>
);
}

export default VildtionLogin;
