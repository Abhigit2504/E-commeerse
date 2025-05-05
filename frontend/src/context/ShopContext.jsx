import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backEndUrl = 'https://e-commeerse.onrender.com';
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [orderData, setOrderData] = useState([]);  // Moved orderData and setOrderData here
  const navigate = useNavigate();

  // Add to Cart functionality
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select size');
      return;
    }
  
    // Ensure the cart data is initialized
    let cartData = structuredClone(cartItems);
  
    // Check if itemId exists in the cart, if not initialize it
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
  
    // Check if the size exists for this itemId, if not initialize it
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }
  
    // Increment the quantity
    cartData[itemId][size] += 1;
    
    // Update the cart state
    setCartItems(cartData);
  
    // If a token exists, send the data to the backend
    if (token) {
      try {
        await axios.post(`${backEndUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backEndUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/product/list');
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backEndUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartDate);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  };

  const loadOrderData = async () => {
    try {
      if (!localStorage.token) return null;
      const response = await axios.post(backEndUrl + '/api/order/userorders', {}, { headers: { token: localStorage.token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getProductsData();
      getUserCart(localStorage.getItem('token'));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getUserCart,
    updateQuantity,
    getCartAmount,
    navigate,
    backEndUrl,
    token,
    setToken,
    loadOrderData,
    orderData,       // Sharing orderData in context
    setOrderData,    // Sharing setOrderData in context
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
