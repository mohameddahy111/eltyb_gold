import { Switch } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Store } from "../../context/dataStore";

const CheckCompo = ({ val, id }) => {
  const { userToken } = Store();
  const [statue, setStatue] = useState(val);
  const changeStatus = async () => {
    await axios
      .put(
        `https://eltaybbackend.onrender.com/product/statue/`,
        { statue:!statue, productId: id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(()=>{changeStatus()},[statue])


  return (
    <Switch
      value={statue}
      defaultChecked={val ? true : false}
      onChange={(e) => {
        setStatue(!statue, changeStatus());
      }}
    />
  );
};

export default CheckCompo;
