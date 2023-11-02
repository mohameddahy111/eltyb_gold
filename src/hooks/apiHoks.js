import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Store } from "../context/dataStore";

export const UseGetAllproducts = () => {
  const { enqueueSnackbar  } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState('');
  const [erros, setErros] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProducts = async (page) => {
    return await axios.get(`https://eltaybbackend.onrender.com/product?page=${page?page:1}`);
  };
  useEffect(() => {
    getProducts()

      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setProducts(res?.data?.data);
          setPagination(res?.data?.page);
          setLoading(false);
        }
      })
      .catch((err) => {
        setErros(err);
        enqueueSnackbar(`${ err.response?.data || err.message}`, { variant: "error" });
        setLoading(false);
      });
  }, []);
  const setpage = async (page) => {
    getProducts(page)

    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        setProducts(res?.data?.data);
        setPagination(res?.data?.page);
        setLoading(false);
      }
    })
    .catch((err) => {
      setErros(err);
      enqueueSnackbar(`${ err.response?.data || err.message}`, { variant: "error" });
      setLoading(false);
    });

  }
  return { products, erros, loading  ,setLoading , pagination , setpage} ;
};
// export const UseGetCart = ()=>{
// const [cart , setCart]=useState([])
// const [erros , setErros]=useState(null)
// const [loading , setLoading]=useState(true)

