import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState(
    localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
  );
  const [loading, setLoading] = useState(true);
  const mobileDivice = useMediaQuery("(max-width:600px)");
  const [openDilago, setOpenDilago] = useState(false);
  const [cart, setCart] = useState("");
  const [pagination, setPagination] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [seleproduct, setSeleProduct] = useState("");
  const [CategoryBrands, setCategoryBrands] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [adminChats, setAdminChats] = useState('');

  const [userToken, setUserToken] = useState(
    localStorage.userToken ? JSON.parse(localStorage.userToken) : null
  );
  const [wishList, setWishList] = useState(
    localStorage.wishList ? JSON.parse(localStorage.wishList) : []
  );
  const [cartItems, setCartItems] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [openLoginDailog, setOpenLoginDailog] = useState(false);

  const addItemToCart = async (item) => {
    if (!userToken) {
      enqueueSnackbar("please login first ", { variant: "info" });
      setOpenLoginDailog(true);
      return;
    }
    if (item.quatitiy < 1) {
      closeSnackbar();
      return enqueueSnackbar("Quatitiy must be greater than 1", {
        variant: "error",
      });
    }
    await axios
      .post(`https://eltaybbackend.onrender.com/cart`, item, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(async (res) => {
        if (res.status === 200) {
          enqueueSnackbar("successfully added item to cart", {
            variant: "success",
          });
          setSeleProduct("");
          setOpenDilago(false);
        }
        getCart();
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });
      });
  };
  const getWishList = async () => {
    await axios
      .get(`https://eltaybbackend.onrender.com/wishlist/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setWishList(res.data.products);
          localStorage.setItem("wishlist", JSON.stringify(res.data.products));
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });
      });
  };

  const getUserInfo = async () => {
    if (userToken && !userInfo) {
      await axios
        .get(`https://eltaybbackend.onrender.com/users/userInfo`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          setUserInfo(res.data.user);
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          getCart();
          getWishList();
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data}`, { variant: "error" });
        });
    }
  };

  const getCart = async () => {
    if (userToken) {
      return await axios
        .get(`https://eltaybbackend.onrender.com/cart`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })

        .then((res) => {
          if (res.status === 200) {
            setCartItems(res.data.cart.cartItems);
            setCart(res.data.cart);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          setCartItems([]);
        });
    }
  };

  //---------------------------admin-------------------------------------//
  //---------------------------get all orders-------------------------------------//
  const getAllOrders = async (page) => {
    await axios
      .get(
        `https://eltaybbackend.onrender.com/orders/allOrders?page=${
          page ? page : 1
        }&sort=_isAccept,-createdAt`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        setAllOrders(res.data.data);
        setPagination(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------------get all category--------------------------------------//
  const getAllCategories = async () => {
    await axios
      .get(`https://eltaybbackend.onrender.com/categories`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-----------------------------------get all Brands--------------------------------//

  const getAllBrands = async (categoryId) => {
    await axios
      .get(`https://eltaybbackend.onrender.com/categories/${categoryId}/brands`)
      .then((res) => {
        setBrandsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------------get All chats--------------------------------//
  const getAllChats = async () => {
    await axios
      .get(`https://eltaybbackend.onrender.com/chat` , {headers: { Authorization: `Bearer ${userToken}` }})
      .then((res) =>{
      setAdminChats(res.data); console.log(res.data)})
      .catch((err) => {
        console.log(err);
      });
  };
  //---------------------------end_admin-------------------------------------//

  useEffect(() => {
    if (userToken ) {
      getUserInfo();
      
      if (userInfo && userInfo?._isAdmin !== "admin") {
        getCart();
        getWishList();
      }
      if (userInfo && userInfo?._isAdmin === "admin") {
        getAllChats();
      }
    }
  }, [userToken]);

  return (
    <DataStore.Provider
      value={{
        mobileDivice,
        userInfo,
        setUserInfo,
        openDilago,
        setOpenDilago,
        seleproduct,
        setSeleProduct,
        addItemToCart,
        cartItems,
        setCartItems,
        openLoginDailog,
        setOpenLoginDailog,
        userToken,
        setUserToken,
        cart,
        setCart,
        getCart,
        loading,
        setLoading,
        getWishList,
        wishList,
        setWishList,
        getAllOrders,
        allOrders,
        setAllOrders,
        pagination,
        setPagination,
        getAllCategories,
        categoryList,
        setCategoryList,
        CategoryBrands,
        setCategoryBrands,
        brandsList,
        setBrandsList,
        getAllBrands,
        openChat,
        setOpenChat,
        adminChats, setAdminChats    ,    getAllChats,
      }}
    >
      {children}{" "}
    </DataStore.Provider>
  );
};
export const Store = () => {
  return useContext(DataStore);
};
