import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../css/swiperMenu.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { serviesList } from "../utils/data";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SwiperBtns() {
  const navigate = useNavigate()
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        // pagination={true}
        // mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {serviesList.map((ele, index) => (
          <SwiperSlide key={index}>
            <Button onClick={()=>navigate(`${ele.path}`)} sx={{width :'200px' , fontSize :'20px' , fontWeight :600 , }} color='secondary' variant="contained" >{ele.title}</Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
