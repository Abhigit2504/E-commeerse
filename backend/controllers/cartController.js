// add products to user cart

import useModel from "../models/userModel.js";

const addCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userDate = await useModel.findById(userId);
    let cartDate = await userDate.cartData;
    if (cartDate[itemId]) {
      if (cartDate[itemId][size]) {
        cartDate[itemId][size] += 1;
      } else {
        cartDate[itemId][size] = 1;
      }
    } else {
      cartDate[itemId] = {};
      cartDate[itemId][size] = 1;
    }
    console.log(cartDate);
    await useModel.findByIdAndUpdate(userId, { cartData: cartDate });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update usercart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userDate = await useModel.findById(userId);
    let cartDate = await userDate.cartData;

    cartDate[itemId][size] = quantity;

    await useModel.findByIdAndUpdate(userId, { cartData: cartDate });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userDate = await useModel.findById(userId);
    let cartDate = await userDate.cartData;
    res.json({ success: true, cartDate });
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

export { addCart, updateCart, getUserCart };
